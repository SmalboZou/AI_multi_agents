import React from 'react';
import { motion } from 'framer-motion';
import { BaseComponentProps, CardVariant } from '@/types';

interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  external?: boolean;
  interactive?: boolean;
}

/**
 * 通用卡片组件
 * 支持多种变体和交互效果
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md',
  onClick,
  href,
  external = false,
  interactive = false,
  ...props
}) => {
  // 基础样式类
  const baseClasses = 'card transition-all duration-300 ease-out';
  
  // 变体样式
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
    hover: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover-card',
    glass: 'glass'
  };
  
  // 内边距样式
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // 悬浮效果样式
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  // 组合所有样式类
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
  
  // 动画配置
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: hover ? { y: -4, scale: 1.02 } : {},
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30,
      opacity: { duration: 0.3 },
      y: { duration: 0.3 }
    }
  };
  
  // 如果是链接卡片
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <motion.a
        href={href}
        className={cardClasses}
        {...motionProps}
        {...linkProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
  
  // 如果有点击事件
  if (onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // 普通卡片
  return (
    <motion.div
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 卡片头部组件
export const CardHeader: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

// 卡片标题组件
export const CardTitle: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 ${className}`}>
      {children}
    </h3>
  );
};

// 卡片描述组件
export const CardDescription: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

// 卡片内容组件
export const CardContent: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

// 卡片底部组件
export const CardFooter: React.FC<BaseComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;