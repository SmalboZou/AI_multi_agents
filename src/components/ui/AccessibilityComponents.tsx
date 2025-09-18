import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { useKeyboardNavigation, useFocusManagement, useScreenReader, useAria, useReducedMotion } from '../../hooks/useAccessibility';

/**
 * 跳转到主内容链接组件
 * 提供键盘用户快速跳转到主内容的功能
 */
export const SkipToContent = ({ targetId = 'main-content', className, ...props }: {
  targetId?: string;
  className?: string;
  [key: string]: any;
}) => {
  const handleSkip = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={(e) => {
        e.preventDefault();
        handleSkip();
      }}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed top-4 left-4 z-50',
        'bg-blue-500 text-white',
        'px-4 py-2 rounded-md',
        'font-medium text-sm',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      {...props}
    >
      跳转到主内容
    </a>
  );
};

/**
 * 可访问的按钮组件
 * 增强的按钮组件，包含完整的可访问性支持
 */
export interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingText = '加载中...',
    ariaLabel,
    ariaDescribedBy,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const { announce } = useScreenReader();
    const { createAriaLabel, createAriaDescribedBy } = useAria();
    const prefersReducedMotion = useReducedMotion();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      props.onClick?.(e);
    };

    useEffect(() => {
      if (loading) {
        announce(loadingText, 'polite');
      }
    }, [loading, loadingText, announce]);

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'animate-pulse': loading && !prefersReducedMotion,
      }
    );

    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
    };

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-10 px-4 py-2 rounded-md',
      lg: 'h-11 px-8 rounded-md',
    };

    const ariaProps = {
      ...(ariaLabel && createAriaLabel(ariaLabel)),
      ...(ariaDescribedBy && createAriaDescribedBy(ariaDescribedBy)),
      'aria-busy': loading,
      'aria-disabled': disabled || loading,
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...ariaProps}
        {...props}
      >
        {loading ? (
          <>
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

/**
 * 可访问的输入框组件
 * 增强的输入框组件，包含完整的可访问性支持
 */
export interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
    const { generateId, createAriaDescribedBy } = useAria();
    const inputId = id || generateId('input');
    const errorId = generateId('error');
    const helperId = generateId('helper');

    const describedByIds = [];
    if (error) describedByIds.push(errorId);
    if (helperText) describedByIds.push(helperId);

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className={cn(
            'text-sm font-medium leading-none',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            error && 'text-red-600 dark:text-red-400'
          )}
        >
          {label}
          {required && (
            <span className="text-red-600 dark:text-red-400 ml-1" aria-label="必填">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800 px-3 py-2 text-sm',
            'ring-offset-white dark:ring-offset-gray-900 file:border-0 file:bg-transparent',
            'file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          aria-required={required}
          aria-invalid={!!error}
          {...(describedByIds.length > 0 && createAriaDescribedBy(describedByIds.join(' ')))}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

/**
 * 可访问的模态框组件
 * 包含焦点陷阱和键盘导航的模态框
 */
export interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const { containerRef, trapFocus, focusFirst } = useFocusManagement();
  const { announce } = useScreenReader();
  const { generateId } = useAria();
  const prefersReducedMotion = useReducedMotion();
  
  const titleId = generateId('modal-title');
  const descriptionId = generateId('modal-description');
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useKeyboardNavigation({
    onEscape: onClose,
  });

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      announce(`模态框已打开: ${title}`, 'assertive');
      // 延迟聚焦以确保模态框已渲染
      setTimeout(() => {
        focusFirst();
      }, 100);
    } else {
      announce('模态框已关闭', 'polite');
      // 恢复之前的焦点
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, title, announce, focusFirst]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', trapFocus);
      return () => document.removeEventListener('keydown', trapFocus);
    }
  }, [isOpen, trapFocus]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      {/* 背景遮罩 */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50',
          !prefersReducedMotion && 'animate-in fade-in-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* 模态框内容 */}
      <div
        ref={containerRef}
        className={cn(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-lg',
          'w-full max-w-md mx-4 p-6',
          'max-h-[90vh] overflow-y-auto',
          !prefersReducedMotion && 'animate-in zoom-in-95 fade-in-0',
          className
        )}
      >
        {/* 标题 */}
        <h2
          id={titleId}
          className="text-lg font-semibold mb-2"
        >
          {title}
        </h2>
        
        {/* 描述 */}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-gray-500 dark:text-gray-400 mb-4"
          >
            {description}
          </p>
        )}
        
        {/* 内容 */}
        <div className="space-y-4">
          {children}
        </div>
        
        {/* 关闭按钮 */}
        <AccessibleButton
          variant="outline"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4"
          ariaLabel="关闭模态框"
        >
          ×
        </AccessibleButton>
      </div>
    </div>
  );
};

/**
 * 可访问的标签页组件
 * 包含键盘导航的标签页组件
 */
export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccessibleTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const { generateId } = useAria();
  const { announce } = useScreenReader();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [focusedTabIndex, setFocusedTabIndex] = useState(0);

  const tabListId = generateId('tablist');
  const getTabId = (tabId: string) => generateId(`tab-${tabId}`);
  const getPanelId = (tabId: string) => generateId(`panel-${tabId}`);

  useKeyboardNavigation({
    onArrowLeft: () => {
      const newIndex = focusedTabIndex > 0 ? focusedTabIndex - 1 : tabs.length - 1;
      setFocusedTabIndex(newIndex);
      focusTab(newIndex);
    },
    onArrowRight: () => {
      const newIndex = focusedTabIndex < tabs.length - 1 ? focusedTabIndex + 1 : 0;
      setFocusedTabIndex(newIndex);
      focusTab(newIndex);
    },
    onEnter: () => {
      const tab = tabs[focusedTabIndex];
      if (tab && !tab.disabled) {
        handleTabChange(tab.id);
      }
    },
  });

  const focusTab = (index: number) => {
    const tabButton = tabListRef.current?.children[index] as HTMLButtonElement;
    if (tabButton) {
      tabButton.focus();
    }
  };

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
      announce(`已切换到标签页: ${tab.label}`, 'polite');
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={cn('w-full', className)}>
      {/* 标签页列表 */}
      <div
        ref={tabListRef}
        role="tablist"
        id={tabListId}
        className="flex border-b border-gray-200 dark:border-gray-700"
        aria-label="标签页导航"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={getTabId(tab.id)}
            role="tab"
            tabIndex={index === focusedTabIndex ? 0 : -1}
            aria-selected={activeTab === tab.id}
            aria-controls={getPanelId(tab.id)}
            disabled={tab.disabled}
            onClick={() => {
              setFocusedTabIndex(index);
              handleTabChange(tab.id);
            }}
            onFocus={() => setFocusedTabIndex(index)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div
        id={getPanelId(activeTab)}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={getTabId(activeTab)}
        className="mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default {
  SkipToContent,
  AccessibleButton,
  AccessibleInput,
  AccessibleModal,
  AccessibleTabs,
};