import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormLocationProps, RegionType } from "../types";
import DistrictForm from "./DistrictForm";
import MapForm from "./MapForm";

const FormLocation = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>("Hlavní město Praha");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormLocationProps>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormLocationProps> = (data) => {
    const district = watch("district");
    navigate("/chci-nabidku/contact", {
      state: { ...data, region: selectedRegion, district },
    });
    console.log({ ...data, region: selectedRegion, district });
  };

  return (
    <div className="w-7/12 mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Kde se nachází vaše nemovitost?</h1>
      <h2 className="text-lg font-bold mb-4">Základní informace</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="propertyType"
            className="block text-gray-700 font-bold mb-2"
          >
            Typ nemovitosti
          </label>
          <select
            id="propertyType"
            {...register("propertyType", {
              required: "Vyberte typ nemovitosti",
              validate: (value) =>
                ["byt", "dům", "pozemek"].includes(value) ||
                "Neplatný typ nemovitosti",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Vyberte typ nemovitosti</option>
            <option value="byt">Byt</option>
            <option value="dům">Dům</option>
            <option value="pozemek">Pozemek</option>
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1">Chyba fromuláře</p>
          )}
        </div>
        <MapForm
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <DistrictForm selectedRegion={selectedRegion} setValue={setValue} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
};

export default FormLocation;
