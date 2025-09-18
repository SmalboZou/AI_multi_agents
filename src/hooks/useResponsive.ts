import { useState, useEffect } from 'react';

/**
 * 响应式断点配置
 */
const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * 响应式状态接口
 */
interface ResponsiveState {
  width: number;
  height: number;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: Breakpoint;
}

/**
 * 响应式Hook
 * 提供屏幕尺寸检测和响应式状态管理
 */
export const useResponsive = (): ResponsiveState => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  /**
   * 获取当前断点
   */
  const getCurrentBreakpoint = (width: number): Breakpoint => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  /**
   * 检查是否匹配指定断点
   */
  const isBreakpoint = (breakpoint: Breakpoint, width: number): boolean => {
    return width >= breakpoints[breakpoint];
  };

  useEffect(() => {
    /**
     * 处理窗口大小变化
     */
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 初始化时获取窗口大小
    handleResize();

    // 清理事件监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowSize;
  const currentBreakpoint = getCurrentBreakpoint(width);

  return {
    width,
    height,
    isXs: isBreakpoint('xs', width),
    isSm: isBreakpoint('sm', width),
    isMd: isBreakpoint('md', width),
    isLg: isBreakpoint('lg', width),
    isXl: isBreakpoint('xl', width),
    is2Xl: isBreakpoint('2xl', width),
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    currentBreakpoint,
  };
};

/**
 * 媒体查询Hook
 * 用于检测特定的媒体查询条件
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    /**
     * 处理媒体查询变化
     */
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 设置初始值
    setMatches(mediaQuery.matches);

    // 添加事件监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleChange);
    }

    // 清理事件监听器
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

/**
 * 设备检测Hook
 * 检测用户设备类型和特性
 */
export const useDeviceDetection = () => {
  const [deviceInfo] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        isTouchDevice: false,
        isIOS: false,
        isAndroid: false,
        isSafari: false,
        isChrome: false,
        isFirefox: false,
      };
    }

    const userAgent = window.navigator.userAgent;
    
    return {
      isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      isIOS: /iPad|iPhone|iPod/.test(userAgent),
      isAndroid: /Android/.test(userAgent),
      isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
      isChrome: /Chrome/.test(userAgent),
      isFirefox: /Firefox/.test(userAgent),
    };
  });

  return deviceInfo;
};

/**
 * 视口Hook
 * 提供视口相关的实用功能
 */
export const useViewport = () => {
  const responsive = useResponsive();
  const device = useDeviceDetection();
  
  /**
   * 获取响应式值
   * 根据当前屏幕尺寸返回对应的值
   */
  const getResponsiveValue = <T>(values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
  }): T | undefined => {
    const { currentBreakpoint } = responsive;
    
    // 按优先级查找匹配的值
    const breakpointOrder: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    
    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    return undefined;
  };

  /**
   * 检查是否为移动端视口
   */
  const isMobileViewport = () => {
    return responsive.isMobile || device.isTouchDevice;
  };

  /**
   * 获取安全的视口尺寸（考虑移动端地址栏等）
   */
  const getSafeViewportHeight = () => {
    if (typeof window === 'undefined') return 768;
    
    // 在移动端使用 visualViewport API 获取更准确的高度
    if (device.isTouchDevice && window.visualViewport) {
      return window.visualViewport.height;
    }
    
    return window.innerHeight;
  };

  return {
    ...responsive,
    ...device,
    getResponsiveValue,
    isMobileViewport,
    getSafeViewportHeight,
  };
};

export default useResponsive;