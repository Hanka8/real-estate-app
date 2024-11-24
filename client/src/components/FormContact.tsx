import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { FormContactProps } from '../types';

const FormContact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormContactProps>();
  const location = useLocation();
  const { propertyType, region, district } = location.state || {};

  const onSubmit: SubmitHandler<FormContactProps> = (data) => {
    const fullData = { ...data, propertyType, region, district };
    // Submit fullData to API
    console.log(fullData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <div className="mb-4">
        <p className="text-gray-700">Typ nemovitosti: {propertyType}</p>
        <p className="text-gray-700">Kraj: {region}</p>
        <p className="text-gray-700">Okres: {district}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700">
          Celé jméno
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Celé jméno je povinné",
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700">
          Telefoní číslo
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone", {
            required: "Telefoní číslo je povinné",
            pattern: {
              value: /^\d{9}$/,
              message: "Neplatné telefoní číslo",
            },
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
          type="email"
          id="email"
          {...register("email", {
            required: "Email je povinný",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Neplatný email",
            },
            maxLength: { value: 100, message: "Maximální délka je 100 znaků" },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

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