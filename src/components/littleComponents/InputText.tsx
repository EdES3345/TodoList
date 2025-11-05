type PropsType = {
    type?: "text" | "password";
    placeholder?: string;
    className?: string;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
    value?: string
    id?: string
}

export function InputText({type = "text", placeholder, onChange, className, value, id}: PropsType) {
    return <input 
            id={id}
            type={type} 
            placeholder={placeholder} 
            className={`border-solid rounded-full border-gray-400 focus:border-blue-500 focus:outline-none px-3 ${className}`}
            onChange={onChange}
            value={value}
            />
}