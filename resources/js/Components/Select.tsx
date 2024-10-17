import React from "react";

interface SelectProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    className?: string;
    label: string;
}

const Select: React.FC<SelectProps> = ({ id, name, value, onChange, options, className, label }) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
                <option value="" disabled>
                    Select {label.toLowerCase()}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
