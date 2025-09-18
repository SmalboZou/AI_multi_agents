import React from 'react';
import { motion } from 'framer-motion';
import { BaseComponentProps } from '@/types';

interface TagProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  icon?: React.ReactNode;
}

/**
 * 标签组件
 * 用于显示分类、技能、状态等信息
 */
const Tag: React.FC<TagProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  onClick,
  icon,
  ...props
}) => {
  // 基础样式类
  const baseClasses = 'tag inline-flex items-center gap-1.5 font-medium transition-all duration-200 cursor-default';
  
  // 变体样式
  const variantClasses = {
    default: 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700',
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20',
    success: 'bg-success-500/10 text-success-500 border border-success-500/20 hover:bg-success-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
  };
  
  // 尺寸样式
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs rounded-md',
    md: 'px-3 py-1.5 text-sm rounded-lg',
    lg: 'px-4 py-2 text-base rounded-xl'
  };
  
  // 可点击样式
  const clickableClasses = onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : '';
  
  // 组合所有样式类
  const tagClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${clickableClasses} ${className}`;
  
  // 动画配置
  const motionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    whileHover: onClick ? { scale: 1.05 } : {},
    whileTap: onClick ? { scale: 0.95 } : {},
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  };
  
  // 删除按钮
  const RemoveButton = () => (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onRemove?.();
      }}
      className="ml-1 hover:bg-current hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="移除标签"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  );
  
  return (
    <motion.span
      className={tagClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {removable && <RemoveButton />}
    </motion.span>
  );
};

// 标签组容器组件
export const TagGroup: React.FC<BaseComponentProps & {
  wrap?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}> = ({ 
  children, 
  className = '', 
  wrap = true, 
  spacing = 'md' 
}) => {
  const spacingClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  };
  
  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto';
  
  return (
    <div className={`flex items-center ${spacingClasses[spacing]} ${wrapClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Tag;