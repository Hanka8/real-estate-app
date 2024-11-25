import { useFormContext } from "react-hook-form";
import EstateTypeOption from "./EstateTypeOption";
import { FormLocationProps, StrokeLinecap, StrokeLinejoin } from "../types";

const estateTypes = [
  {
    id: "byt",
    value: "byt",
    label: "Byt",
    svgProps: {
      viewBox: "0 0 448 512",
      stroke: "#182b4a",
      fill: "#182b4a",
      strokeWidth: "0",
      paths: ["M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"],
    },
  },
  {
    id: "dům",
    value: "dům",
    label: "Dům",
    svgProps: {
      viewBox: "0 0 256 256",
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "8",
      paths: [
        "M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z"
      ]
    }
  },
  {
    id: "pozemek",
    value: "pozemek",
    label: "Pozemek",
    svgProps: {
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      fill: "none",
      strokeWidth: "2",
      strokeLinecap: "round" as StrokeLinecap,
      strokeLinejoin: "round" as StrokeLinejoin,
      paths: [
        "M4 12v4h16v-4z",
        "M6 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6",
        "M14 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6",
      ],
    },
  },
];

const EstateTypeSelect = () => {
  const methods = useFormContext<FormLocationProps>();

  if (!methods) {
    return null;
  }

  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  const selectedType = watch("estateType");

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-4">
        Vyberte typ nemovitosti:
      </label>
      <div className="flex justify-around mb-4">
        {estateTypes.map((type) => (
          <EstateTypeOption
            key={type.id}
            {...type}
            selectedType={selectedType}
            register={register}
          />
        ))}
      </div>
      {errors?.estateType && (
        <p className="text-red-500 mt-2">Nezapomeňte vybrat typ nemovitosti</p>
      )}
    </div>
  );
};

export default EstateTypeSelect;
