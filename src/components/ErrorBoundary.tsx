import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle, RefreshCw } from "lucide-react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; errorInfo: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
    // You can log errors to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback errorInfo={this.state.errorInfo} />;
    }
    return this.props.children;
  }
}

const ErrorFallback = ({ errorInfo }: { errorInfo: string }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block bg-red-100 p-4 rounded-full">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h1>
        
        <p className="text-gray-600 text-lg">
          Don't worry, our team has been notified and we're already working to fix it.
        </p>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-left">
          <p className="text-sm font-mono text-red-700">
            Error details: {errorInfo || "Unknown error"}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If the problem persists, please contact our support team at
          <a href="mailto:support@yourcompany.com" className="text-red-600 hover:underline ml-1">
            support@yourcompany.com
          </a>
        </p>
      </div>
    </div>
  );
};

// Usage in your app:
// Wrap your app components with the ErrorBoundary
// <ErrorBoundary>
//   <YourAppComponents />
// </ErrorBoundary>

export default ErrorBoundary;