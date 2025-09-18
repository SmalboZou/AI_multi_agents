import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 键盘导航Hook
 * 提供键盘导航功能
 */
export const useKeyboardNavigation = ({
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  disabled = false,
}: {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
  disabled?: boolean;
}) => {
  const elementRef = useRef<HTMLElement>(null);

  /**
   * 处理键盘事件
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Tab':
          onTab?.();
          break;
      }
    },
    [disabled, onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { elementRef };
};

/**
 * 焦点管理Hook
 * 提供焦点管理和焦点陷阱功能
 */
export const useFocusManagement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);

  /**
   * 获取可聚焦元素
   */
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    const elements = Array.from(
      containerRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    return elements.filter(
      (element) =>
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hasAttribute('disabled') &&
        element.getAttribute('tabindex') !== '-1'
    );
  }, []);

  /**
   * 更新可聚焦元素列表
   */
  const updateFocusableElements = useCallback(() => {
    const elements = getFocusableElements();
    setFocusableElements(elements);
  }, [getFocusableElements]);

  /**
   * 聚焦到指定索引的元素
   */
  const focusElement = useCallback(
    (index: number) => {
      if (index >= 0 && index < focusableElements.length) {
        focusableElements[index].focus();
        setCurrentFocusIndex(index);
      }
    },
    [focusableElements]
  );

  /**
   * 聚焦到第一个元素
   */
  const focusFirst = useCallback(() => {
    focusElement(0);
  }, [focusElement]);

  /**
   * 聚焦到最后一个元素
   */
  const focusLast = useCallback(() => {
    focusElement(focusableElements.length - 1);
  }, [focusElement, focusableElements.length]);

  /**
   * 聚焦到下一个元素
   */
  const focusNext = useCallback(() => {
    const nextIndex = (currentFocusIndex + 1) % focusableElements.length;
    focusElement(nextIndex);
  }, [currentFocusIndex, focusElement, focusableElements.length]);

  /**
   * 聚焦到上一个元素
   */
  const focusPrevious = useCallback(() => {
    const prevIndex =
      currentFocusIndex <= 0 ? focusableElements.length - 1 : currentFocusIndex - 1;
    focusElement(prevIndex);
  }, [currentFocusIndex, focusElement, focusableElements.length]);

  /**
   * 焦点陷阱
   */
  const trapFocus = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === focusableElements[0]) {
          event.preventDefault();
          focusLast();
        }
      } else {
        if (document.activeElement === focusableElements[focusableElements.length - 1]) {
          event.preventDefault();
          focusFirst();
        }
      }
    },
    [focusableElements, focusFirst, focusLast]
  );

  useEffect(() => {
    updateFocusableElements();
  }, [updateFocusableElements]);

  return {
    containerRef,
    focusableElements,
    currentFocusIndex,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    focusElement,
    trapFocus,
    updateFocusableElements,
  };
};

/**
 * 屏幕阅读器Hook
 * 提供屏幕阅读器支持功能
 */
export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const announcementRef = useRef<HTMLDivElement>(null);

  /**
   * 向屏幕阅读器宣布消息
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev, message]);
    
    // 创建临时的aria-live区域
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    
    document.body.appendChild(liveRegion);
    
    // 短暂延迟后移除
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }, []);

  /**
   * 清除宣布历史
   */
  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
  }, []);

  return {
    announce,
    announcements,
    clearAnnouncements,
    announcementRef,
  };
};

/**
 * 颜色对比度Hook
 * 检查颜色对比度是否符合WCAG标准
 */
export const useColorContrast = () => {
  /**
   * 将十六进制颜色转换为RGB
   */
  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }, []);

  /**
   * 计算相对亮度
   */
  const getLuminance = useCallback((r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }, []);

  /**
   * 计算对比度比率
   */
  const getContrastRatio = useCallback(
    (color1: string, color2: string) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);

      if (!rgb1 || !rgb2) return 0;

      const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);

      return (brightest + 0.05) / (darkest + 0.05);
    },
    [hexToRgb, getLuminance]
  );

  /**
   * 检查是否符合WCAG AA标准
   */
  const meetsWCAG_AA = useCallback(
    (foreground: string, background: string, isLargeText = false) => {
      const ratio = getContrastRatio(foreground, background);
      return isLargeText ? ratio >= 3 : ratio >= 4.5;
    },
    [getContrastRatio]
  );

  /**
   * 检查是否符合WCAG AAA标准
   */
  const meetsWCAG_AAA = useCallback(
    (foreground: string, background: string, isLargeText = false) => {
      const ratio = getContrastRatio(foreground, background);
      return isLargeText ? ratio >= 4.5 : ratio >= 7;
    },
    [getContrastRatio]
  );

  return {
    getContrastRatio,
    meetsWCAG_AA,
    meetsWCAG_AAA,
  };
};

/**
 * 减少动画Hook
 * 检测用户是否偏好减少动画
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * ARIA属性Hook
 * 提供ARIA属性管理功能
 */
export const useAria = () => {
  /**
   * 生成唯一ID
   */
  const generateId = useCallback((prefix = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * 创建ARIA标签属性
   */
  const createAriaLabel = useCallback((label: string) => {
    return { 'aria-label': label };
  }, []);

  /**
   * 创建ARIA描述属性
   */
  const createAriaDescribedBy = useCallback((id: string) => {
    return { 'aria-describedby': id };
  }, []);

  /**
   * 创建ARIA标记属性
   */
  const createAriaLabelledBy = useCallback((id: string) => {
    return { 'aria-labelledby': id };
  }, []);

  /**
   * 创建ARIA展开状态属性
   */
  const createAriaExpanded = useCallback((expanded: boolean) => {
    return { 'aria-expanded': expanded };
  }, []);

  /**
   * 创建ARIA隐藏属性
   */
  const createAriaHidden = useCallback((hidden: boolean) => {
    return { 'aria-hidden': hidden };
  }, []);

  /**
   * 创建ARIA实时区域属性
   */
  const createAriaLive = useCallback((politeness: 'off' | 'polite' | 'assertive') => {
    return { 'aria-live': politeness };
  }, []);

  return {
    generateId,
    createAriaLabel,
    createAriaDescribedBy,
    createAriaLabelledBy,
    createAriaExpanded,
    createAriaHidden,
    createAriaLive,
  };
};

export default {
  useKeyboardNavigation,
  useFocusManagement,
  useScreenReader,
  useColorContrast,
  useReducedMotion,
  useAria,
};