import { useEffect } from "react";
import { DistrictSelectProps } from "../types";
import { useForm, Controller } from "react-hook-form";
import { regionsData } from "../data/regionsData";

const DistrictSelect = ({
  selectedRegion,
  setValue,
}: DistrictSelectProps & { selectedRegion: keyof typeof regionsData }) => {
  const { control } = useForm({
    defaultValues: {
      district: "",
    },
  });

  // Update the districts when the selected region changes
  useEffect(() => {
    if (selectedRegion) {
      // Reset selected district when the region changes
      setValue("district", "");
    }
  }, [selectedRegion, setValue]);

  const districts = selectedRegion ? regionsData[selectedRegion] : [];

  return (
    <div className="mb-6">
      {selectedRegion && (
        <>
          <label className="block text-gray-700 font-bold mb-4">Vyberte okres:</label>
          <div className="space-y-2">
            {/* Use Controller to manage the radio buttons */}
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {districts.map((district: string) => (
                    <div
                      key={district}
                      className="flex items-center cursor-pointer p-1"
                    >
                      <input
                        type="radio"
                        id={district}
                        {...field}
                        value={district}
                        checked={field.value === district}
                        onChange={() => {
                          field.onChange(district);
                          setValue("district", district);
                        }}
                        className="hidden" // Hide the default radio button
                      />

                      <label
                        htmlFor={district}
                        className={` cursor-pointer flex flex-row align-center ${
                          field.value === district
                            ? "custom-color-1"
                            : "custom-color-2"
                        }`}
                      >
                        <span
                          className={`inline-block mr-2 w-5 h-5 rounded-full mt-0.5  ${
                            field.value === district
                              ? "bg-white border-4 border-blue-500"
                              : "bg-white border-2 border-gray-300"
                          }`}
                        ></span>
                        {district}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DistrictSelect;
