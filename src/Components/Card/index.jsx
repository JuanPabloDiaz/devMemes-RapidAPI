const Card = (data) => {
  return (
    <div className="w-80 md:w-96 h-fit rounded-lg border shadow-lg shadow-black">
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 bg-white/60 rounded-lg text-black text-xs m-2 py-0.5 px-2">
          {/* {data.data.category.name} */}
        </span>
        <img
          className="rounded-lg w-full h-full object-cover"
          src={data.data.image}
          alt={data.data.created}
        />
      </figure>
      <p className="flex justify-around">
        <span className="text-sm font-light">{data.data.id}</span>
      </p>
    </div>
  );
};

export default Card;
