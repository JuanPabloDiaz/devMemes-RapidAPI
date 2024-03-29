const Card = (data) => {
  let date = new Date(data.data.modified);
  let year = date.getFullYear();
  let month = date.toLocaleString("default", { month: "short" }); // Get month name
  let day = date.getDate();

  let formattedDate = `${month} ${day} ${year}`;

  return (
    <div className="h-fit w-80 rounded-lg border shadow-lg shadow-black md:w-96">
      <figure className="relative mb-2 h-4/5 w-full">
        {/* <span className="absolute bottom-0 m-2 rounded-lg bg-white/90 px-2 py-0.5 text-xs text-black">
          {formattedDate}
        </span> */}
        <img
          className="h-full w-full rounded-lg object-cover p-1"
          src={data.data.image}
          alt={data.data.created}
        />
      </figure>
      {/* <p className="flex justify-around">
        <span className="text-sm font-light">{formattedDate}</span>
      </p> */}
    </div>
  );
};

export default Card;
