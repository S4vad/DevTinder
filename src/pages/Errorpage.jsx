import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("error is",error); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
      <p className="text-xl mt-4 text-gray-700">Something went wrong.</p>

      {/* Show error message if available */}
      <p className="mt-2 text-gray-500">
        {error?.statusText || error?.message || "Unknown error"}
      </p>

      <a href="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go Back Home
      </a>
    </div>
  );
}
