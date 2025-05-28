const Card = ({ data, dataSource }) => {
  // Handle data from either API
  let date = new Date(data.modified);
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "short" }); // Get month name
  let day = date.getDate();

  let formattedDate = `${month} ${day} ${year}`;
  
  // Get the title/name to display
  const title = data.title || "";
  
  return (
    <div className="h-fit w-full rounded-lg border shadow-lg shadow-black bg-gray-100 overflow-hidden">
      <div className="p-3 pb-0">
        <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mb-2">{formattedDate}</p>
      </div>
      <figure className="relative w-full">
        <div className="aspect-[4/3] flex items-center justify-center bg-gray-200 overflow-hidden">
          <img
            className="w-full h-auto max-h-[500px] rounded-lg object-contain transition-transform hover:scale-105"
            src={data.image}
            alt={title || "Image"}
            loading="lazy"
            width="600"
            height="400"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
            }}
          />
        </div>
      </figure>
      <div className="p-3 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {dataSource || "Programming Memes"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;