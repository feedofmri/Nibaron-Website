import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/helpers';

const inputVariants = cva(
  'flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20',
        error: 'border-error focus:border-error focus:ring-error/20',
        success: 'border-success focus:border-success focus:ring-success/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-12 px-4',
        lg: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Input = forwardRef(({
  className,
  variant,
  size,
  type = 'text',
  error,
  success,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  const inputVariant = error ? 'error' : success ? 'success' : variant;

  const InputComponent = (
    <input
      type={type}
      className={cn(
        inputVariants({ variant: inputVariant, size }),
        leftIcon && 'pl-10',
        rightIcon && 'pr-10',
        className
      )}
      ref={ref}
      {...props}
    />
  );

  if (leftIcon || rightIcon) {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        {InputComponent}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }

  return InputComponent;
});

Input.displayName = 'Input';

export default Input;
