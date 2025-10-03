import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/helpers';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-primary active:scale-95',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
        outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 focus:ring-primary-500',
        ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
        accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-sm hover:shadow-lg',
        success: 'bg-success text-white hover:bg-success/90 focus:ring-success',
        warning: 'bg-warning text-white hover:bg-warning/90 focus:ring-warning',
        error: 'bg-error text-white hover:bg-error/90 focus:ring-error',
        glass: 'glass-card text-text-primary hover:bg-white/20 focus:ring-primary-500',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-12 px-6 py-3',
        lg: 'h-14 px-8 py-4 text-lg',
        xl: 'h-16 px-10 py-5 text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({
  className,
  variant,
  size,
  loading = false,
  isLoading = false, // Accept both loading and isLoading for compatibility
  loadingText = 'Loading...',
  leftIcon,
  rightIcon,
  children,
  onClick,
  disabled,
  type,
  ...restProps // Only pass valid DOM attributes
}, ref) => {
  // Use either loading or isLoading prop
  const isButtonLoading = loading || isLoading;

  const handleClick = (e) => {
    if (isButtonLoading || disabled) {
      e.preventDefault();
      return;
    }

    // Ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      onClick={handleClick}
      disabled={isButtonLoading || disabled}
      type={type}
      {...restProps} // Only valid DOM props will be passed
    >
      {isButtonLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {leftIcon && !isButtonLoading && (
        <span className="mr-2 flex-shrink-0">
          {leftIcon}
        </span>
      )}

      <span className={cn('truncate', isButtonLoading && 'opacity-80')}>
        {isButtonLoading && loadingText ? loadingText : children}
      </span>

      {rightIcon && !isButtonLoading && (
        <span className="ml-2 flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
