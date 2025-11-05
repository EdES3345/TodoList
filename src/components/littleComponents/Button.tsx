import { type PropsWithChildren } from "react";

type PropsType = PropsWithChildren<{
    className?: string;
    onClick?: () => void
    disabled?: boolean
}>

export function Button({className, onClick, disabled, children}: PropsType) {
    return <button 
        className={`text-white bg-blue-500 hover:bg-blue-600 border-none rounded-full hover:cursor-pointer disabled:bg-blue-200 disabled:cursor-not-allowed ${className}`} 
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
}