import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 sm:w-10/12 max-w-screen-md mx-auto bg-white p-8 rounded-lg shadow-md mt-4 sm:mt-6 mb-4 sm:mb-6 sm:mb-8 sm:mt-8 custom-color-1 text-center">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 poppins">
        Úspěch!
      </h1>
      <p className="text-lg mb-6 custom-color-2">
        Vaše data byla úspěšně odeslána.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Zpět na hlavní stránku
      </button>
    </div>
  );
};

export default Success;
