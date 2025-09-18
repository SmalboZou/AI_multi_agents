import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 性能监控Hook
 * 提供性能指标监控和优化建议
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: { used: 0, total: 0, percentage: 0 },
    fps: 0,
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number>();

  /**
   * 测量FPS
   */
  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCount.current = 0;
      lastTime.current = now;
    }
    
    animationId.current = requestAnimationFrame(measureFPS);
  }, []);

  /**
   * 获取内存使用情况
   */
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1048576); // MB
      const total = Math.round(memory.totalJSHeapSize / 1048576); // MB
      const percentage = total > 0 ? Math.round((used / total) * 100) : 0;
      return {
        used,
        total,
        percentage,
      };
    }
    return null;
  }, []);

  /**
   * 测量页面加载时间
   */
  const measureLoadTime = useCallback(() => {
    if ('navigation' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));
    }
  }, []);

  useEffect(() => {
    // 开始FPS监控
    measureFPS();
    
    // 测量加载时间
    if (document.readyState === 'complete') {
      measureLoadTime();
    } else {
      window.addEventListener('load', measureLoadTime);
    }

    // 定期更新内存使用情况
    const memoryInterval = setInterval(() => {
      const memory = getMemoryUsage();
      if (memory) {
        setMetrics(prev => ({ ...prev, memoryUsage: memory }));
      }
    }, 5000);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      clearInterval(memoryInterval);
      window.removeEventListener('load', measureLoadTime);
    };
  }, [measureFPS, measureLoadTime, getMemoryUsage]);

  return {
    metrics,
    getMemoryUsage,
  };
};

/**
 * 懒加载Hook
 * 提供图片和组件的懒加载功能
 */
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, hasLoaded]);

  return {
    elementRef,
    isVisible,
    hasLoaded,
  };
};

/**
 * 防抖Hook
 * 提供防抖功能，优化性能
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 节流Hook
 * 提供节流功能，限制函数调用频率
 */
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef(0);
  const timeoutRef = useRef<number>();

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        return callback(...args);
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
        }, delay - (now - lastCall.current));
      }
    }) as T,
    [callback, delay]
  );
};

/**
 * 虚拟滚动Hook
 * 提供大列表的虚拟滚动功能
 */
export const useVirtualScroll = ({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  /**
   * 计算可见范围
   */
  const getVisibleRange = useCallback(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      itemCount - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight)
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(itemCount - 1, endIndex + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  /**
   * 处理滚动事件
   */
  const handleScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, 16); // 60fps

  const { startIndex, endIndex } = getVisibleRange();
  const visibleItems = endIndex - startIndex + 1;
  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    scrollElementRef,
    handleScroll,
    visibleItems,
    startIndex,
    endIndex,
    totalHeight,
    offsetY,
  };
};

/**
 * 预加载Hook
 * 提供资源预加载功能
 */
export const usePreload = () => {
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());
  const [loadingResources, setLoadingResources] = useState<Set<string>>(new Set());

  /**
   * 预加载图片
   */
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedResources.has(src)) {
        resolve();
        return;
      }

      if (loadingResources.has(src)) {
        // 如果正在加载，等待加载完成
        const checkLoaded = () => {
          if (loadedResources.has(src)) {
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }

      setLoadingResources(prev => new Set(prev).add(src));

      const img = new Image();
      img.onload = () => {
        setLoadedResources(prev => new Set(prev).add(src));
        setLoadingResources(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        resolve();
      };
      img.onerror = () => {
        setLoadingResources(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }, [loadedResources, loadingResources]);

  /**
   * 批量预加载图片
   */
  const preloadImages = useCallback(async (srcs: string[]) => {
    const promises = srcs.map(src => preloadImage(src));
    await Promise.allSettled(promises);
  }, [preloadImage]);

  /**
   * 检查资源是否已加载
   */
  const isLoaded = useCallback((src: string) => {
    return loadedResources.has(src);
  }, [loadedResources]);

  /**
   * 检查资源是否正在加载
   */
  const isLoading = useCallback((src: string) => {
    return loadingResources.has(src);
  }, [loadingResources]);

  return {
    preloadImage,
    preloadImages,
    isLoaded,
    isLoading,
    loadedCount: loadedResources.size,
    loadingCount: loadingResources.size,
  };
};

export default {
  usePerformance,
  useLazyLoad,
  useDebounce,
  useThrottle,
  useVirtualScroll,
  usePreload,
};