import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  subtitle?: string;
}

const SectionHeading = React.forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ className, level = 2, children, subtitle, ...props }, ref) => {
    const baseStyles = 'font-semibold text-text-primary tracking-tight';
    
    const levelStyles = {
      1: 'text-4xl md:text-5xl',
      2: 'text-2xl md:text-3xl',
      3: 'text-xl md:text-2xl'
    };
    
    const headingProps = {
      className: cn(baseStyles, levelStyles[level], className),
      ref,
      ...props,
      children
    };
    
    return (
      <div className="text-center mb-16 md:mb-24">
        {level === 1 && <h1 {...headingProps} />}
        {level === 2 && (
           <h2 className={cn("text-3xl md:text-[44px] font-semibold tracking-tight text-text-primary mb-4", className)} ref={ref}>
             {children}
           </h2>
        )}
        {level === 3 && <h3 {...headingProps} />}
        {subtitle && (
          <p className="text-lg text-text-secondary opacity-70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

export { SectionHeading };