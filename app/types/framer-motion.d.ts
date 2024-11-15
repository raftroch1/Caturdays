declare module 'framer-motion' {
  import * as React from 'react';

  export interface AnimationProps {
    animate?: any;
    initial?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export interface MotionProps extends AnimationProps {
    [key: string]: any;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLDivElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLSpanElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLButtonElement>>;
    a: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLAnchorElement>>;
    // Add other HTML elements as needed
  };
}
