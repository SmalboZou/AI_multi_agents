import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * 悬浮卡片组件属性接口
 */
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  hoverY?: number;
  glowEffect?: boolean;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
}

/**
 * 悬浮卡片组件
 * 提供丰富的悬浮交互效果
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverY = -8,
  glowEffect = false,
  shadowIntensity = 'medium',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * 获取阴影样式
   */
  const getShadowClass = () => {
    switch (shadowIntensity) {
      case 'light':
        return 'shadow-sm hover:shadow-md';
      case 'medium':
        return 'shadow-md hover:shadow-lg';
      case 'heavy':
        return 'shadow-lg hover:shadow-xl';
      default:
        return 'shadow-md hover:shadow-lg';
    }
  };

  return (
    <motion.div
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer',
        getShadowClass(),
        glowEffect && isHovered && 'glow',
        className
      )}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        y: hoverY,
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 淡入动画组件属性接口
 */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

/**
 * 淡入动画组件
 * 提供方向性淡入动画效果
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  /**
   * 获取初始位置
   */
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        },
      });
    }
  }, [isInView, controls, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

/**
 * 交错动画组件属性接口
 */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * 交错动画组件
 * 为子元素提供交错动画效果
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  childDelay = 0,
  direction = 'up',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  /**
   * 获取动画变体
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * 脉冲动画组件属性接口
 */
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  repeat?: number;
  delay?: number;
}

/**
 * 脉冲动画组件
 * 提供脉冲缩放动画效果
 */
export const Pulse: React.FC<PulseProps> = ({
  children,
  className,
  scale = 1.05,
  duration = 1,
  repeat = Infinity,
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 浮动动画组件属性接口
 */
interface FloatProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}

/**
 * 浮动动画组件
 * 提供上下浮动动画效果
 */
export const Float: React.FC<FloatProps> = ({
  children,
  className,
  distance = 10,
  duration = 3,
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 旋转动画组件属性接口
 */
interface SpinProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  direction?: 'clockwise' | 'counterclockwise';
  repeat?: number;
}

/**
 * 旋转动画组件
 * 提供旋转动画效果
 */
export const Spin: React.FC<SpinProps> = ({
  children,
  className,
  duration = 2,
  direction = 'clockwise',
  repeat = Infinity,
}) => {
  const rotation = direction === 'clockwise' ? 360 : -360;

  return (
    <motion.div
      className={className}
      animate={{ rotate: rotation }}
      transition={{
        duration,
        repeat,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 打字机效果组件属性接口
 */
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

/**
 * 打字机效果组件
 * 提供逐字显示的打字机动画效果
 */
export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
          
          // 光标闪烁效果
          if (cursor) {
            setInterval(() => {
              setShowCursor(prev => !prev);
            }, 500);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, cursor, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
      {cursor && isComplete && showCursor && '|'}
    </span>
  );
};

/**
 * 磁性按钮组件属性接口
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

/**
 * 磁性按钮组件
 * 提供磁性吸引效果的按钮
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.3,
  onClick,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  /**
   * 处理鼠标移动
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  /**
   * 处理鼠标离开
   */
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      className={cn('cursor-pointer', className)}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 粒子效果组件属性接口
 */
interface ParticleEffectProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  size?: number;
  speed?: number;
}

/**
 * 粒子效果组件
 * 提供动态粒子背景效果
 */
export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  className,
  particleCount = 50,
  colors = ['#3b82f6', '#10b981', '#f59e0b'],
  size = 2,
  speed = 1,
}) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: size,
            height: size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration * speed,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default {
  HoverCard,
  FadeIn,
  Stagger,
  Pulse,
  Float,
  Spin,
  Typewriter,
  MagneticButton,
  ParticleEffect,
};