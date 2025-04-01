declare module 'typewriter-effect' {
  import { ComponentType } from 'react';

  interface TypewriterProps {
    onInit?: (typewriter: any) => void;
    options?: {
      strings?: string[];
      autoStart?: boolean;
      loop?: boolean;
      delay?: number;
      deleteSpeed?: number;
      pauseFor?: number;
    };
  }

  const Typewriter: ComponentType<TypewriterProps>;
  export default Typewriter;
} 