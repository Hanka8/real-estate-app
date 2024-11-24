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
    <div style={{ marginTop: "20px" }}>
      {selectedRegion && (
        <>
          <label className="block text-gray-700 font-bold mb-2">Okres:</label>
          <div className="space-y-2">
            {/* Use Controller to manage the radio buttons */}
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <>
                  {districts.map((district: string) => (
                    <div key={district} className="flex items-center">
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
                        className="mr-2"
                      />
                      <label htmlFor={district} className="text-gray-700">
                        {district}
                      </label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DistrictSelect;
