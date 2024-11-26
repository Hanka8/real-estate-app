import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContactProps, FormInputProps } from "../types";
import FormInput from "./FormInput";

const BASE_URL = "https://real-estate-app-bgvb.onrender.com/lead";

const inputFields: Array<Omit<FormInputProps, "register" | "errors">> = [
  {
    id: "fullName",
    label: "Celé jméno",
    placeholder: 'Např. "Jan Novák"',
    validation: {
      required: "Celé jméno je povinné",
      maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
    },
  },
  {
    id: "phone",
    label: "Telefoní číslo (bez předvolby)",
    placeholder: 'Např. "789654321"',
    validation: {
      required: "Telefoní číslo je povinné",
      pattern: {
        value: /^\d{9}$/,
        message: "Neplatné telefoní číslo",
      },
      maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
    },
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Např. jan.novak@seznam.cz",
    validation: {
      required: "Email je povinný",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Neplatný email",
      },
      maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
    },
  },
];

const FormContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormContactProps>();
  const location = useLocation();
  const navigate = useNavigate();
  const { estateType, region, district } = location.state || {};
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormContactProps> = (data) => {
    const fullData = { ...data, estateType, region, district };
    const submitData = async () => {
      try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        navigate("/chci-nabidku/uspech");
      } catch (error) {
        console.error("Error:", error);
        setError("Něco se pokazilo. Zkuste to prosím znovu.");
      }
    };

    submitData();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-11/12 sm:w-10/12 max-w-screen-md mx-auto bg-white p-8 rounded-lg shadow-md mt-4 sm:mt-6 mb-4 sm:mb-6 sm:mb-8 sm:mt-8 custom-color-1"
    >
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 poppins">
        Kontaktní údaje
      </h1>
      <h2 className="text-lg font-bold mb-6 custom-color-2">
        Zanechte nám prosím své kontaktní údaje, abychom vás mohli co nejdříve
        kontaktovat.
      </h2>
      
      {inputFields.map((field) => (
        <FormInput
          key={field.id}
          {...field}
          register={register}
          errors={errors}
        />
      ))}

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Odeslat
      </button>
    </form>
  );
};

export default FormContact;
