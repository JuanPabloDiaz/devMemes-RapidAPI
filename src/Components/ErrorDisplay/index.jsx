const ErrorDisplay = ({ message, onRetry }) => {
    return (
      <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-3">Oops! Something went wrong.</h3>
        <p className="mb-4">{message || "An unexpected error occurred."}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-150"
          >
            Try Again
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorDisplay;
  