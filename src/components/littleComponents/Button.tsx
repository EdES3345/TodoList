import { type PropsWithChildren } from "react";

type PropsType = PropsWithChildren<{
    className?: string;
    onClick?: () => void
}>

export function Button({className, onClick, children}: PropsType) {
    return <button 
        className={`text-white bg-blue-500 hover:bg-gray-400 border-none rounded-xl hover:cursor-pointer ${className}`} 
        onClick={onClick}>
            {children}
        </button>
}