import { Home, AlertCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block bg-red-100 p-4 rounded-full">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>

        <p className="text-gray-600 text-lg">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-left">
          <p className="text-sm font-mono text-red-700">Error Code: 404</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>

          <button
            onClick={() => navigate("/search")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search Again
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If you believe this is an error, please contact support at{" "}
          <a href="mailto:support@yourcompany.com" className="text-red-600 hover:underline">
            support@yourcompany.com
          </a>
        </p>
      </div>
    </div>
  );
}
