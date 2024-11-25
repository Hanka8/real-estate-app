import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormLocationProps, RegionType } from "../types";
import DistrictSelect from "./DistrictSelect";
import RegionSelect from "./RegionSelect";
import EstateTypeSelect from "./EstateTypeSelect";

const FormLocation = () => {
  const [selectedRegion, setSelectedRegion] =
    useState<RegionType>("Hlavní město Praha");

  const methods = useForm<FormLocationProps>({
    defaultValues: {
      propertyType: "",
      district: "",
    },
  });
  const { watch, setValue } = methods;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormLocationProps> = (data) => {
    const district = watch("district");
    navigate("/chci-nabidku/contact", {
      state: { ...data, region: selectedRegion, district },
    });
  };

  return (
    <div className="w-11/12 sm:w-10/12 max-w-screen-md mx-auto bg-white p-8 rounded-lg shadow-md mt-4 sm:mt-6 mb-4 sm:mb-6 sm:mb-8 sm:mt-8 custom-color-1">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 poppins">
        Kde se nachází vaše nemovitost?
      </h1>
      <h2 className="text-lg font-bold mb-6 custom-color-2">
        Vyberte typ nemovitosti, kraj a okres.
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <EstateTypeSelect />
          <RegionSelect
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <DistrictSelect selectedRegion={selectedRegion} setValue={setValue} />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Pokračovat
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormLocation;
