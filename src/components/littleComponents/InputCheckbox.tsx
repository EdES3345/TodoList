type PropsType = {
    placeholder?: string;
    className?: string;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
    checked?: boolean
}

export function InputCheckbox({ placeholder, onChange, className, checked}: PropsType) {
    return <input 
            type="checkbox"
            placeholder={placeholder} 
            className={`border-solid rounded-xl accent-blue-500 ${className}`}
            onChange={onChange}
            checked={checked}
            />
}