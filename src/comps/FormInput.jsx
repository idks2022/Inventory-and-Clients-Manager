const InputComponent = ({
  label,
  type = "text",
  name,
  register,
  validation,
  error,
  disabled = false,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}:</label>
    <input
      type={type}
      name={name}
      {...register(name, validation)}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
      disabled={disabled}
      required={required}
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export default InputComponent;
