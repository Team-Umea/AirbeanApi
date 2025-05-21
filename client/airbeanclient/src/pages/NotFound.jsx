const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-400">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Sidan kunde inte hittas</p>
        <p className="mt-2 text-gray-600">Det verkar som att du har gått vilse. Men det är lugnt, vi hjälper dig tillbaka.</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 text-white bg-amber-600 hover:bg-blue-700 rounded-md text-sm font-medium"
        >
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
