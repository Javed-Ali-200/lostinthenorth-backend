import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className = '', ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="block text-sm font-semibold text-slate-700 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full rounded-xl border-2 border-slate-100 bg-slate-50 py-2.5 transition-all
              focus:border-main focus:bg-white focus:outline-none focus:ring-4 focus:ring-main/10
              placeholder:text-slate-400 text-black-custom
              ${icon ? 'pl-11 pr-4' : 'px-4'}
              ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50' : ''}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs font-medium text-rose-500 ml-1 mt-1 transition-all">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
