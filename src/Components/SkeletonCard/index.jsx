const SkeletonCard = () => {
    return (
      <div className="h-fit w-80 rounded-lg border border-gray-200 shadow-lg shadow-neutral-300 md:w-96 p-1 animate-pulse bg-white">
        <div className="relative mb-2 h-4/5 w-full">
          {/* Approximate height of the image area in the Card component */}
          <div className="h-64 bg-gray-300 rounded-lg md:h-72"></div> {/* Placeholder for image */}
        </div>
        {/* If the Card component had text elements below the image, 
            you would add corresponding skeleton elements here. 
            For example:
        <div className="p-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        */}
      </div>
    );
  };
  
  export default SkeletonCard;
  