interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  icon?: React.ReactNode;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  icon,
}: FormInputProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 relative">
        {icon && (
          <div className="w-4 absolute inset-y-0  flex items-center left-2">
            {icon}
          </div>
        )}
        <input
          name={name}
          className="pl-10 bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-blue-500 border-none placeholder:text-neutral-400"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
      <div className="flex flex-col gap-2 text-left">
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}
