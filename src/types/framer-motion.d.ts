declare module 'framer-motion' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';

  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
    href?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
  }

  export const motion: {
    div: ComponentType<MotionProps>;
    section: ComponentType<MotionProps>;
    nav: ComponentType<MotionProps>;
    header: ComponentType<MotionProps>;
    footer: ComponentType<MotionProps>;
    button: ComponentType<MotionProps>;
    a: ComponentType<MotionProps>;
    span: ComponentType<MotionProps>;
    p: ComponentType<MotionProps>;
    h1: ComponentType<MotionProps>;
    h2: ComponentType<MotionProps>;
    h3: ComponentType<MotionProps>;
    h4: ComponentType<MotionProps>;
    h5: ComponentType<MotionProps>;
    h6: ComponentType<MotionProps>;
  };

  export const AnimatePresence: ComponentType<{
    children: ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
  }>;
} 