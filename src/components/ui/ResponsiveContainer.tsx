import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * 响应式容器组件属性接口
 */
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'full' | 'wide' | 'narrow' | 'compact';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * 响应式容器组件
 * 提供统一的响应式布局容器
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  size = 'wide',
  padding = 'md',
  animate = false,
  as: Component = 'div',
}) => {
  /**
   * 获取容器尺寸样式
   */
  const getSizeClasses = () => {
    switch (size) {
      case 'full':
        return 'w-full';
      case 'wide':
        return 'w-full max-w-7xl mx-auto';
      case 'narrow':
        return 'w-full max-w-4xl mx-auto';
      case 'compact':
        return 'w-full max-w-2xl mx-auto';
      default:
        return 'w-full max-w-7xl mx-auto';
    }
  };

  /**
   * 获取内边距样式
   */
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'px-3 sm:px-4';
      case 'md':
        return 'px-4 sm:px-6 lg:px-8';
      case 'lg':
        return 'px-6 sm:px-8 lg:px-12';
      case 'xl':
        return 'px-8 sm:px-12 lg:px-16';
      default:
        return 'px-4 sm:px-6 lg:px-8';
    }
  };

  const containerClasses = cn(
    getSizeClasses(),
    getPaddingClasses(),
    className
  );

  if (animate) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return React.createElement(Component, { className: containerClasses }, children);
};

/**
 * 响应式网格组件属性接口
 */
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  autoFit?: boolean;
  minItemWidth?: string;
}

/**
 * 响应式网格组件
 * 提供灵活的响应式网格布局
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { xs: 1, sm: 2, lg: 3, xl: 4 },
  gap = 'md',
  autoFit = false,
  minItemWidth = '280px',
}) => {
  /**
   * 获取网格列数样式
   */
  const getGridColsClasses = () => {
    if (autoFit) {
      return '';
    }

    const classes = ['grid'];
    
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return classes.join(' ');
  };

  /**
   * 获取间距样式
   */
  const getGapClasses = () => {
    switch (gap) {
      case 'sm':
        return 'gap-3 sm:gap-4';
      case 'md':
        return 'gap-4 sm:gap-6';
      case 'lg':
        return 'gap-6 sm:gap-8';
      case 'xl':
        return 'gap-8 sm:gap-10';
      default:
        return 'gap-4 sm:gap-6';
    }
  };

  const gridClasses = cn(
    autoFit ? 'grid' : getGridColsClasses(),
    getGapClasses(),
    className
  );

  const gridStyle = autoFit
    ? {
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
      }
    : undefined;

  return (
    <div className={gridClasses} style={gridStyle}>
      {children}
    </div>
  );
};

/**
 * 响应式Flex组件属性接口
 */
interface ResponsiveFlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: {
    xs?: 'row' | 'col';
    sm?: 'row' | 'col';
    md?: 'row' | 'col';
    lg?: 'row' | 'col';
    xl?: 'row' | 'col';
  };
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

/**
 * 响应式Flex组件
 * 提供灵活的响应式Flex布局
 */
export const ResponsiveFlex: React.FC<ResponsiveFlexProps> = ({
  children,
  className,
  direction = { xs: 'col', md: 'row' },
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
}) => {
  /**
   * 获取方向样式
   */
  const getDirectionClasses = () => {
    const classes = ['flex'];
    
    if (direction.xs) classes.push(`flex-${direction.xs}`);
    if (direction.sm) classes.push(`sm:flex-${direction.sm}`);
    if (direction.md) classes.push(`md:flex-${direction.md}`);
    if (direction.lg) classes.push(`lg:flex-${direction.lg}`);
    if (direction.xl) classes.push(`xl:flex-${direction.xl}`);
    
    return classes.join(' ');
  };

  /**
   * 获取对齐样式
   */
  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'end':
        return 'items-end';
      case 'stretch':
        return 'items-stretch';
      default:
        return 'items-start';
    }
  };

  /**
   * 获取分布样式
   */
  const getJustifyClasses = () => {
    switch (justify) {
      case 'start':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'end':
        return 'justify-end';
      case 'between':
        return 'justify-between';
      case 'around':
        return 'justify-around';
      case 'evenly':
        return 'justify-evenly';
      default:
        return 'justify-start';
    }
  };

  /**
   * 获取间距样式
   */
  const getGapClasses = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2 sm:gap-3';
      case 'md':
        return 'gap-3 sm:gap-4';
      case 'lg':
        return 'gap-4 sm:gap-6';
      case 'xl':
        return 'gap-6 sm:gap-8';
      default:
        return 'gap-3 sm:gap-4';
    }
  };

  const flexClasses = cn(
    getDirectionClasses(),
    getAlignClasses(),
    getJustifyClasses(),
    getGapClasses(),
    wrap && 'flex-wrap',
    className
  );

  return (
    <div className={flexClasses}>
      {children}
    </div>
  );
};

/**
 * 响应式文本组件属性接口
 */
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    xs?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    md?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    xl?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  };
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * 响应式文本组件
 * 提供响应式文字大小
 */
export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className,
  size = { xs: 'base', md: 'lg' },
  as: Component = 'p',
}) => {
  /**
   * 获取文字大小样式
   */
  const getSizeClasses = () => {
    const classes = [];
    
    if (size.xs) classes.push(`text-${size.xs}`);
    if (size.sm) classes.push(`sm:text-${size.sm}`);
    if (size.md) classes.push(`md:text-${size.md}`);
    if (size.lg) classes.push(`lg:text-${size.lg}`);
    if (size.xl) classes.push(`xl:text-${size.xl}`);
    
    return classes.join(' ');
  };

  const textClasses = cn(getSizeClasses(), className);

  return React.createElement(Component, { className: textClasses }, children);
};

export default ResponsiveContainer;