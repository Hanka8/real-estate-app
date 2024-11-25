import { EstateTypeOptionProps } from "../types";

const EstateTypeOption = ({
  id,
  value,
  selectedType,
  register,
  label,
  svgProps,
}: EstateTypeOptionProps) => (
  <div className="flex flex-col items-center">
    <input
      type="radio"
      id={id}
      value={value}
      {...register("estateType", {
        required: "Vyberte typ nemovitosti",
      })}
      className="hidden"
    />
    <label
      htmlFor={id}
      className={`text-center cursor-pointer md:min-w-32 sm:min-w-28 min-w-20 p-2 sm:p-4 md:p-8 rounded-lg transition-shadow duration-300 ease-in-out shadow-lg border-2 hover:border-[#3b82f6] ${
        selectedType === value
          ? "bg-blue-100 border-[#3b82f6]"
          : "border-gray-300"
      }`}
    >
      <svg
        className="w-6 h-6 mx-auto mb-2"
        stroke={svgProps.stroke}
        fill={svgProps.fill}
        strokeWidth={svgProps.strokeWidth}
        viewBox={svgProps.viewBox}
        strokeLinecap={svgProps.strokeLinecap}
        strokeLinejoin={svgProps.strokeLinejoin}
        xmlns="http://www.w3.org/2000/svg"
      >
        {svgProps.paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
      <span className="text-sm sm:text-base">{label}</span>
    </label>
  </div>
);

export default EstateTypeOption;