import type { PropsWithChildren } from "react"

type PropsTypeBox = PropsWithChildren <{
    styleBox: "error" | "success" | "info",
    className?: string 
}>

export function InformationBox({styleBox, className, children}: PropsTypeBox) {
    const styleBoxList = {
        "error": "bg-red-500/25 border-red-600 text-red-600",
        "success": "bg-green-500/25 border-green-700 text-green-700",
        "info": "bg-blue-500/25 border-blue-600 text-blue-600"
    }

    return <div className={`px-4 py-3 text-xs text-center border-3 rounded-xl ${styleBoxList[styleBox]} ${className}`}>{children}</div>
}

type PropsTypeButton = PropsWithChildren <{
    styleBox: "error" | "success" | "info", 
    onClick?: () => void
    className?: string
}>


export function ButtonInformationBox({styleBox, onClick, className, children}: PropsTypeButton) {
    const styleBoxList = {
        "error": "text-red-200 bg-red-600 hover:bg-red-600",
        "success": "text-green-200 bg-green-700 hover:bg-green-600",
        "info": "text-blue-200 bg-blue-600 hover:bg-blue-600"
    }

    return <button className={`px-4 py-2 mt-2 text-xs border-0 text-center rounded-xl hover:cursor-pointer ${styleBoxList[styleBox]} ${className}`} onClick={onClick}>{children}</button>
}