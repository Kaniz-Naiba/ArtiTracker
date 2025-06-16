const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-700">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
};

export default NotFound;