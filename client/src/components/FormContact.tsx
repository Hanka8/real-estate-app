import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContactProps } from '../types';

const FormContact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormContactProps>();
  const location = useLocation();
  const navigate = useNavigate();
  const { estateType, region, district } = location.state || {};
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormContactProps> = (data) => {
    const fullData = { ...data, estateType, region, district };
    const URL = "https://real-estate-app-bgvb.onrender.com/lead";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullData),
    })
      .then(() => {
        navigate("/chci-nabidku/uspech");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Něco se pokazilo. Zkuste to prosím znovu.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-11/12 sm:w-10/12 max-w-screen-md mx-auto bg-white p-8 rounded-lg shadow-md mt-4 sm:mt-6 mb-4 sm:mb-6 sm:mb-8 sm:mt-8 custom-color-1"
    >
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 poppins">
        Kde se nachází vaše nemovitost?
      </h1>
      <h2 className="text-lg font-bold mb-6 custom-color-2">
        Zanechte nám prosím své kontaktní údaje, abychom vás mohli co nejdříve
        kontaktovat.
      </h2>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700">
          Celé jméno
        </label>
        <input
          type="text"
          placeholder='Např. "Jan Novák"'
          id="fullName"
          {...register("fullName", {
            required: "Celé jméno je povinné",
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700">
          Telefoní číslo (bez předvolby)
        </label>
        <input
          type="text"
          placeholder='Např. "789654321"'
          id="phone"
          {...register("phone", {
            required: "Telefoní číslo je povinné",
            pattern: {
              value: /^\d{9}$/,
              message: "Neplatné telefoní číslo",
            },
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="text"
          placeholder="Např. jan.novak@seznam.cz"
          id="email"
          {...register("email", {
            required: "Email je povinný",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Neplatný email",
            },
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Odeslat
      </button>
    </form>
  );
}

export default FormContact;