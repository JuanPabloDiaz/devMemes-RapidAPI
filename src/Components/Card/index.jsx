const Card = (data) => {
  // Handle data from either API
  let date = new Date(data.data.modified);
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "short" }); // Get month name
  let day = date.getDate();

  let formattedDate = `${month} ${day} ${year}`;
  
  // Get the title/name to display
  const title = data.data.title || "";
  
  return (
    <div className="h-fit w-full rounded-lg border shadow-lg shadow-black">
      <figure className="relative mb-2 w-full aspect-[16/9]">
        <span className="absolute bottom-0 m-2 rounded-lg bg-white/90 px-2 py-0.5 text-xs text-black">
          {title}
        </span>
        <img
          className="h-full w-full rounded-lg object-cover"
          src={data.data.image}
          alt={title || "Image"}
          loading="lazy"
          width="600"
          height="400"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
          }}
        />
      </figure>
      <p className="flex justify-around">
        <span className="text-sm font-light">{formattedDate}</span>
      </p>
    </div>
  );
};

export default Card;