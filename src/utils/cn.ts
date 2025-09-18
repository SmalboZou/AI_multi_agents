import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并和优化Tailwind CSS类名
 * 使用clsx进行条件类名处理，使用tailwind-merge避免冲突
 * 
 * @param inputs - 类名输入，支持字符串、对象、数组等多种格式
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 响应式类名生成器
 * 根据断点生成响应式类名
 */
export const responsive = {
  /**
   * 生成响应式文字大小类名
   */
  text: (sizes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  }) => {
    const classes = [];
    if (sizes.xs) classes.push(`text-${sizes.xs}`);
    if (sizes.sm) classes.push(`sm:text-${sizes.sm}`);
    if (sizes.md) classes.push(`md:text-${sizes.md}`);
    if (sizes.lg) classes.push(`lg:text-${sizes.lg}`);
    if (sizes.xl) classes.push(`xl:text-${sizes.xl}`);
    if (sizes['2xl']) classes.push(`2xl:text-${sizes['2xl']}`);
    return classes.join(' ');
  },

  /**
   * 生成响应式间距类名
   */
  spacing: (type: 'p' | 'px' | 'py' | 'm' | 'mx' | 'my', sizes: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  }) => {
    const classes = [];
    if (sizes.xs) classes.push(`${type}-${sizes.xs}`);
    if (sizes.sm) classes.push(`sm:${type}-${sizes.sm}`);
    if (sizes.md) classes.push(`md:${type}-${sizes.md}`);
    if (sizes.lg) classes.push(`lg:${type}-${sizes.lg}`);
    if (sizes.xl) classes.push(`xl:${type}-${sizes.xl}`);
    if (sizes['2xl']) classes.push(`2xl:${type}-${sizes['2xl']}`);
    return classes.join(' ');
  },

  /**
   * 生成响应式网格列数类名
   */
  gridCols: (cols: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  }) => {
    const classes = ['grid'];
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    return classes.join(' ');
  },

  /**
   * 生成响应式显示/隐藏类名
   */
  display: (displays: {
    xs?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
    sm?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
    md?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
    lg?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
    xl?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
    '2xl'?: 'block' | 'hidden' | 'flex' | 'grid' | 'inline' | 'inline-block';
  }) => {
    const classes = [];
    if (displays.xs) classes.push(displays.xs);
    if (displays.sm) classes.push(`sm:${displays.sm}`);
    if (displays.md) classes.push(`md:${displays.md}`);
    if (displays.lg) classes.push(`lg:${displays.lg}`);
    if (displays.xl) classes.push(`xl:${displays.xl}`);
    if (displays['2xl']) classes.push(`2xl:${displays['2xl']}`);
    return classes.join(' ');
  },
};

/**
 * 条件类名工具
 */
export const conditional = {
  /**
   * 根据条件返回类名
   */
  when: (condition: boolean, trueClass: string, falseClass?: string) => {
    return condition ? trueClass : (falseClass || '');
  },

  /**
   * 根据值匹配返回类名
   */
  match: <T>(value: T, cases: Record<string, string>, defaultClass?: string) => {
    return cases[String(value)] || defaultClass || '';
  },
};

/**
 * 变体类名生成器
 */
export const variants = {
  /**
   * 按钮变体
   */
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    ghost: 'text-blue-600 hover:bg-blue-100',
    link: 'text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline',
  },

  /**
   * 尺寸变体
   */
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },

  /**
   * 圆角变体
   */
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
};

export default cn;