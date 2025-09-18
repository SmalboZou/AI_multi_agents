import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '@/hooks/usePerformance';

/**
 * 性能监控组件属性接口
 */
interface PerformanceMonitorProps {
  className?: string;
  showDetails?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * 性能监控组件
 * 实时显示页面性能指标
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  className = '',
  showDetails = false,
  position = 'bottom-right'
}) => {
  const { metrics } = usePerformance();
  const [isVisible, setIsVisible] = useState(false);

  // 开发环境下显示性能监控
  useEffect(() => {
    setIsVisible(typeof window !== 'undefined' && window.location.hostname === 'localhost');
  }, []);

  if (!isVisible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.fair) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-50 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-xs font-mono text-white border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">性能监控</span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={getPerformanceColor(60 - metrics.fps, { good: 5, fair: 15 })}>
              {metrics.fps.toFixed(0)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>内存:</span>
            <span className={getPerformanceColor(metrics.memoryUsage.used, { good: 50, fair: 100 })}>
              {metrics.memoryUsage.used.toFixed(1)}MB
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>加载:</span>
            <span className={getPerformanceColor(metrics.loadTime, { good: 1000, fair: 3000 })}>
              {metrics.loadTime.toFixed(0)}ms
            </span>
          </div>
          
          {showDetails && (
            <>
              <div className="border-t border-gray-600 pt-1 mt-2">
                <div className="flex justify-between">
                  <span>DOM:</span>
                  <span className="text-gray-300">
                    {document.querySelectorAll('*').length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>连接:</span>
                  <span className="text-gray-300">
                    {(navigator as any).connection?.effectiveType || 'unknown'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;