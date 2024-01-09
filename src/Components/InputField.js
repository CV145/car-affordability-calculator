// InputField.js
function InputField({ label, name, type, value, onChange, placeholder, prefix, options }) {
    // Render a select dropdown if options are provided, otherwise render an input
    const inputOrSelect = options ? (
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded py-2 px-3 text-gray-700"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option} months
                </option>
            ))}
        </select>
    ) : (
        <input
            className={`w-full border rounded py-2 px-3 ${prefix ? 'pl-8' : ''}`}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <div className={`relative ${prefix ? 'flex items-center' : ''}`}>
                {prefix && (
                    <span className="absolute left-0 pl-3 flex items-center pointer-events-none">
                        {prefix}
                    </span>
                )}
                {inputOrSelect}
            </div>
        </div>
    );
}

export default InputField;
