type PropsType = {
    type: "text" | "password";
    placeholder?: string;
    className?: string;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
    value?: string
}

export function InputText({type, placeholder, onChange, className, value}: PropsType) {
    return <input 
            type={type} 
            placeholder={placeholder} 
            className={"border-solid rounded-xl border-gray-400 focus:border-blue-500 focus:outline-none px-3 " + className}
            onChange={onChange}
            value={value}
            />
}