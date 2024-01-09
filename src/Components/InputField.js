// InputField.js
function InputField({ label, name, type, value, onChange, placeholder, prefix, options }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <div className={`relative ${options ? '' : 'flex align-center text-gray-700'}`}>
                {prefix && (
                    <span className="absolute left-0 pl-3 flex items-center">{prefix}</span>
                )}
                {!options ? (
                    <input
                        className={`w-full border rounded py-2 px-3 ${prefix ? 'pl-8' : 'pl-3'}`}
                        type={type}
                        name={name}
                        id={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                ) : (
                    <select
                        name={name}
                        id={name}
                        value={value}
                        onChange={onChange}
                        className="w-full border rounded py-2 px-3 text-gray-700"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}

export default InputField;
