const Layout = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="h-full overflow-auto">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <div className="flex min-h-[100vh] flex-col items-center justify-between py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
