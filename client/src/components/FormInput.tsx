import { FormInputProps } from "../types";

const FormInput = ({
  id,
  label,
  placeholder,
  register,
  validation,
  errors,
  type = "text",
}: FormInputProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      {...register(id, validation)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-500"
    />
    {errors[id] && (
      <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>
    )}
  </div>
);

export default FormInput;