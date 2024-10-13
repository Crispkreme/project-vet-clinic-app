import React from "react";

interface TextareaProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
    className?: string;
    label: string;
}

const Textarea: React.FC<TextareaProps> = ({ id, name, value, onChange, placeholder, rows = 4, className, label }) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-3 py-2 border rounded-md"
            ></textarea>
        </div>
    );
};

export default Textarea;
