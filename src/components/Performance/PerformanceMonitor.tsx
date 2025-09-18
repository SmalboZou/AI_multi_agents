import React, { useEffect, useState } from 'react';
import { usePerformance } from '../../hooks/usePerformance';

/**
 * 性能监控组件接口
 */
export interface PerformanceMonitorProps {
  enabled?: boolean;
  showMetrics?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  domContentLoaded?: number;
  loadComplete?: number;
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };
  connectionType?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * 性能监控组件
 * 监控和显示网站性能指标
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = true,
  showMetrics = false,
  onMetricsUpdate,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(showMetrics);
  const { getMemoryUsage } = usePerformance();

  /**
   * 获取连接类型
   */
  const getConnectionType = (): string => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  };

  /**
   * 检测设备类型
   */
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  /**
   * 获取Web Vitals指标
   */
  const getWebVitals = () => {
    // 使用Performance Observer API获取指标
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, fid }));
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  };

  /**
   * 获取导航时间指标
   */
  const getNavigationTiming = () => {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      const ttfb = timing.responseStart - timing.navigationStart;
      const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      const loadComplete = timing.loadEventEnd - timing.navigationStart;

      setMetrics(prev => ({
        ...prev,
        ttfb,
        domContentLoaded,
        loadComplete,
      }));
    }
  };

  /**
   * 更新内存使用情况
   */
  const updateMemoryUsage = () => {
    const memoryUsage = getMemoryUsage();
    if (memoryUsage) {
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  };

  /**
   * 更新设备和连接信息
   */
  const updateDeviceInfo = () => {
    setMetrics(prev => ({
      ...prev,
      connectionType: getConnectionType(),
      deviceType: getDeviceType(),
    }));
  };

  /**
   * 格式化性能指标显示
   */
  const formatMetric = (value: number | undefined, unit = 'ms'): string => {
    if (value === undefined) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  /**
   * 获取指标状态颜色
   */
  const getMetricColor = (metric: keyof PerformanceMetrics, value: number | undefined): string => {
    if (value === undefined) return 'text-gray-500';

    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-500';

    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  useEffect(() => {
    if (!enabled) return;

    // 初始化性能监控
    getWebVitals();
    getNavigationTiming();
    updateDeviceInfo();

    // 定期更新内存使用情况
    const memoryInterval = setInterval(updateMemoryUsage, 5000);

    // 监听窗口大小变化
    const handleResize = () => {
      updateDeviceInfo();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(memoryInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  if (!enabled || !showMetrics) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">性能监控</h3>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-xs text-gray-300 hover:text-white"
          >
            {isVisible ? '隐藏' : '显示'}
          </button>
        </div>
        
        {isVisible && (
          <div className="space-y-2 text-xs">
            {/* Web Vitals */}
            <div>
              <h4 className="font-medium mb-1">Web Vitals</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-300">FCP: </span>
                  <span className={getMetricColor('fcp', metrics.fcp)}>
                    {formatMetric(metrics.fcp)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">LCP: </span>
                  <span className={getMetricColor('lcp', metrics.lcp)}>
                    {formatMetric(metrics.lcp)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">FID: </span>
                  <span className={getMetricColor('fid', metrics.fid)}>
                    {formatMetric(metrics.fid)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">CLS: </span>
                  <span className={getMetricColor('cls', metrics.cls)}>
                    {metrics.cls !== undefined ? metrics.cls.toFixed(3) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* 加载时间 */}
            <div>
              <h4 className="font-medium mb-1">加载时间</h4>
              <div className="space-y-1">
                <div>
                  <span className="text-gray-300">TTFB: </span>
                  <span className={getMetricColor('ttfb', metrics.ttfb)}>
                    {formatMetric(metrics.ttfb)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">DOM: </span>
                  <span className="text-blue-400">
                    {formatMetric(metrics.domContentLoaded)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">Load: </span>
                  <span className="text-purple-400">
                    {formatMetric(metrics.loadComplete)}
                  </span>
                </div>
              </div>
            </div>

            {/* 内存使用 */}
            {metrics.memoryUsage && (
              <div>
                <h4 className="font-medium mb-1">内存使用</h4>
                <div className="space-y-1">
                  <div>
                    <span className="text-gray-300">已用: </span>
                    <span className="text-orange-400">
                      {metrics.memoryUsage?.used ? (metrics.memoryUsage.used / 1024 / 1024).toFixed(1) : '0'}MB
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">占用: </span>
                    <span className="text-orange-400">
                      {metrics.memoryUsage?.percentage ? metrics.memoryUsage.percentage.toFixed(1) : '0'}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 设备信息 */}
            <div>
              <h4 className="font-medium mb-1">设备信息</h4>
              <div className="space-y-1">
                <div>
                  <span className="text-gray-300">设备: </span>
                  <span className="text-cyan-400">{metrics.deviceType}</span>
                </div>
                <div>
                  <span className="text-gray-300">网络: </span>
                  <span className="text-cyan-400">{metrics.connectionType}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 性能警告组件
 * 当性能指标超过阈值时显示警告
 */
export const PerformanceAlert: React.FC<{
  metrics: PerformanceMetrics;
  onDismiss?: () => void;
}> = ({ metrics, onDismiss }) => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts: string[] = [];

    if (metrics.lcp && metrics.lcp > 4000) {
      newAlerts.push('LCP过慢，可能影响用户体验');
    }
    if (metrics.fid && metrics.fid > 300) {
      newAlerts.push('FID过高，页面响应较慢');
    }
    if (metrics.cls && metrics.cls > 0.25) {
      newAlerts.push('CLS过高，页面布局不稳定');
    }
    if (metrics.memoryUsage && metrics.memoryUsage.percentage > 80) {
      newAlerts.push('内存使用率过高');
    }

    setAlerts(newAlerts);
  }, [metrics]);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">性能警告</h3>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-200 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
        <ul className="text-sm space-y-1">
          {alerts.map((alert, index) => (
            <li key={index}>• {alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default {
  PerformanceMonitor,
  PerformanceAlert,
};