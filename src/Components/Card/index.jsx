const Card = ({ data, dataSource }) => {
  let date = new Date(data.modified);
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "short" });
  let day = date.getDate();

  let formattedDate = `${month} ${day} ${year}`;

  const title = data.title || "";

  return (
    <div className="h-fit w-full overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl shadow-blue-900/20 transition-all duration-300 hover:border-blue-700/50 hover:shadow-blue-500/30">
      <div className="p-3 pb-1">
        <h3 className="mb-1 truncate text-base font-medium text-gray-100">
          {title}
        </h3>
        <p className="mb-1 flex items-center text-xs text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formattedDate}
        </p>
      </div>
      <figure className="relative w-full">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
          <img
            className="h-auto max-h-[400px] w-full object-contain transition-all duration-500 hover:scale-105"
            src={data.image}
            alt={title || "Image"}
            loading="lazy"
            width="600"
            height="400"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Available";
            }}
          />
        </div>
      </figure>
      <div className="p-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-blue-700/30 bg-blue-900/50 px-2 py-1 text-xs text-blue-200 backdrop-blur-sm">
            {dataSource === "Bob's Burgers API" && data.occupation
              ? data.occupation
              : dataSource === "Bob's Burgers API"
                ? "Character"
                : "Programming Meme"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
