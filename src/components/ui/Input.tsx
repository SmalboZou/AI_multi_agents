import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BaseComponentProps } from '@/types';

interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * 输入框组件
 * 支持多种样式、尺寸和状态
 */
const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    className = '',
    type = 'text',
    placeholder,
    value,
    defaultValue,
    disabled = false,
    required = false,
    error,
    label,
    helperText,
    icon,
    iconPosition = 'left',
    size = 'md',
    variant = 'default',
    onChange,
    onFocus,
    onBlur,
    ...props
  },
  ref
) => {
  // 基础样式类
  const baseClasses = 'input w-full transition-all duration-200 focus:outline-none';
  
  // 变体样式
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    filled: 'bg-gray-50 dark:bg-gray-900 border-0 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500'
  };
  
  // 尺寸样式
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-3 text-base rounded-lg',
    lg: 'px-5 py-4 text-lg rounded-xl'
  };
  
  // 错误状态样式
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : '';
  
  // 禁用状态样式
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';
  
  // 图标容器样式
  const iconContainerClasses = `absolute top-1/2 transform -translate-y-1/2 ${
    iconPosition === 'left' ? 'left-3' : 'right-3'
  } text-gray-600 dark:text-gray-300`;
  
  // 输入框样式（考虑图标位置）
  const inputPaddingClasses = icon 
    ? iconPosition === 'left' 
      ? 'pl-10' 
      : 'pr-10'
    : '';
  
  // 组合所有样式类
  const inputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${disabledClasses} ${inputPaddingClasses} ${className}`;
  
  return (
    <div className="w-full">
      {/* 标签 */}
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>
      )}
      
      {/* 输入框容器 */}
      <div className="relative">
        {/* 图标 */}
        {icon && (
          <div className={iconContainerClasses}>
            {icon}
          </div>
        )}
        
        {/* 输入框 */}
        <motion.input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
      </div>
      
      {/* 错误信息 */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      
      {/* 帮助文本 */}
      {helperText && !error && (
        <motion.p
          className="mt-2 text-sm text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// 文本域组件
interface TextareaProps extends Omit<InputProps, 'type' | 'icon' | 'iconPosition'> {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((
  {
    className = '',
    placeholder,
    value,
    defaultValue,
    disabled = false,
    required = false,
    error,
    label,
    helperText,
    size = 'md',
    variant = 'default',
    rows = 4,
    resize = 'vertical',
    onChange,
    onFocus,
    onBlur,
    ...props
  },
  ref
) => {
  // 基础样式类
  const baseClasses = 'input w-full transition-all duration-200 focus:outline-none';
  
  // 变体样式
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    filled: 'bg-gray-50 dark:bg-gray-900 border-0 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500'
  };
  
  // 尺寸样式
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-3 text-base rounded-lg',
    lg: 'px-5 py-4 text-lg rounded-xl'
  };
  
  // 错误状态样式
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : '';
  
  // 禁用状态样式
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';
  
  // 调整大小样式
  const resizeClasses = `resize-${resize}`;
  
  // 组合所有样式类
  const textareaClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${disabledClasses} ${resizeClasses} ${className}`;
  
  return (
    <div className="w-full">
      {/* 标签 */}
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>
      )}
      
      {/* 文本域 */}
      <motion.textarea
        ref={ref}
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        rows={rows}
        onChange={onChange as any}
        onFocus={onFocus as any}
        onBlur={onBlur as any}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      
      {/* 错误信息 */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      
      {/* 帮助文本 */}
      {helperText && !error && (
        <motion.p
          className="mt-2 text-sm text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {helperText}
        </motion.p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;