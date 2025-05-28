const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mt-8 flex flex-col items-center md:mt-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
