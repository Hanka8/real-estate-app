import { useFormContext } from "react-hook-form";
import { FormLocationProps } from "../types";

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

  const selectedType = watch("propertyType");

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-4">
        Vyberte typ nemovitosti:
      </label>
      <div className="flex justify-around mb-4">
        <div className="flex flex-col items-center">
          <input
            type="radio"
            id="byt"
            value="byt"
            {...register("propertyType", {
              required: "Vyberte typ nemovitosti",
            })}
            className="hidden"
          />
          <label
            htmlFor="byt"
            className={`text-center cursor-pointer md:min-w-32 sm:min-w-28 min-w-20 p-2 sm:p-4 md:p-8 rounded-lg transition-shadow duration-300 ease-in-out shadow-lg border-2 hover:border-[#3b82f6] ${
              selectedType === "byt"
                ? "bg-blue-100 border-[#3b82f6]"
                : "border-gray-300"
            }`}
          >
            <svg
              className="w-6 h-6 mx-auto mb-2"
              stroke="#182b4a"
              fill="#182b4a"
              strokeWidth="0"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
            </svg>
            <span className="text-sm sm:text-base">Byt</span>
          </label>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="radio"
            id="dům"
            value="dům"
            {...register("propertyType", {
              required: "Vyberte typ nemovitosti",
            })}
            className="hidden"
          />
          <label
            htmlFor="dům"
            className={`text-center cursor-pointer md:min-w-32 sm:min-w-28 min-w-20 p-2 sm:p-4 md:p-8 rounded-lg transition-shadow duration-300 ease-in-out shadow-lg border-2 hover:border-[#3b82f6] ${
              selectedType === "dům"
                ? "bg-blue-100 border-[#3b82f6]"
                : "border-gray-300"
            }`}
          >
            <svg
              className="w-6 h-6 mx-auto mb-2"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="8"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z"></path>
            </svg>
            <span className="text-sm sm:text-base">Dům</span>
          </label>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="radio"
            id="pozemek"
            value="pozemek"
            {...register("propertyType", {
              required: "Vyberte typ nemovitosti",
            })}
            className="hidden"
          />
          <label
            htmlFor="pozemek"
            className={`text-center cursor-pointer md:min-w-32 sm:min-w-28 min-w-20 p-2 sm:p-4 md:p-8 rounded-lg transition-shadow duration-300 ease-in-out shadow-lg border-2 hover:border-[#3b82f6] ${
              selectedType === "pozemek"
                ? "bg-blue-100 border-[#3b82f6]"
                : "border-gray-300"
            }`}
          >
            <svg
              className="w-6 h-6 mx-auto mb-2"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 12v4h16v-4z"></path>
              <path d="M6 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6"></path>
              <path d="M14 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6"></path>
            </svg>
            <span className="text-sm sm:text-base">Pozemek</span>
          </label>
        </div>
      </div>
      {errors?.propertyType && (
        <p className="text-red-500 mt-2">Nezapomeňte vybrat typ nemovitosti</p>
      )}
    </div>
  );
};

export default EstateTypeSelect;

