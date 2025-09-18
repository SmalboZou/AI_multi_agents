import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

// 导入布局组件
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 导入功能组件
import HeroSection from './components/features/HeroSection';
import AboutSection from './components/features/AboutSection';
import ArticlesSection from './components/features/ArticlesSection';
import ProjectsSection from './components/features/ProjectsSection';
import SkillsSection from './components/features/SkillsSection';

// 导入UI组件
import { Button } from './components/ui';

// 导入SEO和性能优化组件
import { SEOHead, createStructuredData } from './components/SEO/SEOHead';
import { PerformanceMonitor } from './components/features/PerformanceMonitor';
import { SkipToContent } from './components/ui/AccessibilityComponents';
import { useLazyLoad } from './hooks/usePerformance';
import { useScreenReader, useReducedMotion } from './hooks/useAccessibility';

/**
 * 主应用组件
 * 整合所有页面模块，提供完整的个人作品集网站体验
 * 包含SEO优化、性能监控和可访问性支持
 */
function App() {
  // 主题状态管理
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // 滚动位置状态
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 页面加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  
  // 性能和可访问性Hooks
  // const { metrics } = usePerformance();
  const { announce } = useScreenReader();
  const prefersReducedMotion = useReducedMotion();
  // const { isVisible: heroInView } = useLazyLoad(0.1);
  // const { isVisible: aboutInView } = useLazyLoad(0.1);
  // const { isVisible: projectsInView } = useLazyLoad(0.1);
  // 懒加载hooks（预留用于性能优化）
  useLazyLoad(0.1);
  useLazyLoad(0.1);
  
  // 结构化数据
  const structuredData = createStructuredData.portfolio({
    name: '个人作品集',
    description: '展示我的技能、项目和经验的个人作品集网站',
    author: '开发者',
    works: [
      {
        name: '项目一',
        description: '使用React和TypeScript开发的现代化Web应用',
        technology: ['React', 'TypeScript', 'Tailwind CSS'],
        dateCreated: '2024-01-01',
      },
      // 可以添加更多项目
    ],
  });

  /**
   * 切换主题模式
   * 包含可访问性支持
   */
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    
    // 向屏幕阅读器宣布主题变化
    announce(`已切换到${newTheme ? '深色' : '浅色'}主题`, 'polite');
    
    // 保存主题偏好到本地存储
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  /**
   * 回到顶部
   * 包含可访问性支持
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
    
    // 向屏幕阅读器宣布操作
    announce('已回到页面顶部', 'polite');
    
    // 聚焦到主内容区域
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  };

  /**
   * 滚动到指定区域
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Header高度
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0;
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setShowBackToTop(currentScrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 初始化主题
  useEffect(() => {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldUseDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    document.documentElement.classList.toggle('dark', isDarkMode);

    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false);
      announce('页面加载完成', 'polite');
    }, 1500);

    // 开发环境下显示性能监控
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      setShowPerformanceMonitor(true);
    }

    return () => clearTimeout(timer);
  }, [isDarkMode, announce]);

  // 加载动画组件
  const LoadingScreen = () => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-lg font-medium text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          加载中...
        </motion.p>
      </div>
    </motion.div>
  );

  return (
    <HelmetProvider>
      {/* SEO优化 */}
      <SEOHead
        title="个人作品集 - 前端开发工程师"
        description="展示我的技能、项目和经验的个人作品集网站，专注于React、TypeScript和现代前端技术"
        keywords={['前端开发', 'React', 'TypeScript', 'Tailwind CSS', '作品集', 'Web开发', 'JavaScript']}
        author="开发者"
        structuredData={structuredData}
      />
      
      {/* 跳转到主内容链接 */}
      <SkipToContent targetId="main-content" />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
          {/* 导航栏 */}
          <Header 
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            onNavigate={scrollToSection}
            scrollY={scrollY}
          />

          {/* 主要内容区域 */}
          <main id="main-content" className="relative" tabIndex={-1}>
            {/* 英雄区 */}
            <section id="hero" className="relative">
              <HeroSection onNavigate={scrollToSection} />
            </section>

            {/* 关于我区域 */}
            <section id="about" className="relative">
              <AboutSection />
            </section>

            {/* 技能展示区域 */}
            <section id="skills" className="relative">
              <SkillsSection />
            </section>

            {/* 项目展示区域 */}
            <section id="projects" className="relative">
              <ProjectsSection />
            </section>

            {/* 文章区域 */}
            <section id="articles" className="relative">
              <ArticlesSection />
            </section>
          </main>

          {/* 页脚 */}
          <Footer onNavigate={scrollToSection} />

          {/* 回到顶部按钮 */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.div
                className="fixed bottom-8 right-8 z-40"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={scrollToTop}
                  size="lg"
                  className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white border-0"
                  aria-label="回到顶部"
                >
                  <ChevronUp className="w-6 h-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

            {/* 滚动进度条 */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-primary z-40 origin-left"
              style={{
                scaleX: scrollProgress
              }}
            />
          </motion.div>
        )}
        
        {/* 性能监控组件 */}
        {showPerformanceMonitor && (
          <PerformanceMonitor
            showDetails={showPerformanceMonitor}
          />
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;