import { useEffect, useState, useMemo } from "react";
import Layout from "./Components/Layout";
import Card from "./Components/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

function App() {
  // options is required ~ Rapid API
  const options = useMemo(() => ({
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
    },
  }), []);

  // First element from useState is the state itself (""). The initial value, in this case an empty string
  // Second is the function that will update the state (setEndPoint). The "Changer" function
  const [endPoint, setEndPoint] = useState("");
  // container is an empty array. setContainer is the function that will update the state of the container
  const [container, setContainer] = useState([]);

  useEffect(() => {
    // const url = `https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`;  // IMDb API

    const url = "https://programming-memes-images.p.rapidapi.com/v1/memes";
    // async function:
    const fetchData = async () => {
      try {
        // Log for API key presence is already added
        console.log("API Key Present:", !!import.meta.env.VITE_RAPID_API_KEY); 
        const response = await fetch(url, options);

        if (!response.ok) {
          let errorData = null;
          try {
            errorData = await response.json();
          } catch (parseError) {
            // Ignore if error response is not JSON
          }
          console.error(
            "API request failed:", 
            response.status, 
            response.statusText, 
            errorData
          );
          throw new Error(
            `API request failed with status ${response.status}: ${
              errorData?.message || errorData?.error || response.statusText
            }`
          );
        }

        const result = await response.json();

        if (Array.isArray(result)) {
          setContainer(result);
          setDataSource("Programming Memes API");
        } else if (result && Array.isArray(result.memes)) {
          setContainer(result.memes);
          setDataSource("Programming Memes API");
        } else if (result && Array.isArray(result.data)) {
          setContainer(result.data);
          setDataSource("Programming Memes API");
        } else {
          console.error(
            "API response is not an array and no known array property (memes, data) was found. Received:",
            result
          );
          setContainer([]);
        }
      } catch (error) {
        console.error("Error during data fetching, parsing, or handling:", error);
        console.log("Using Bob's Burgers API as fallback");
        // Fetch data from Bob's Burgers API as fallback
        fetchBobsBurgersData();
      }
    };

    // Function to fetch data from Bob's Burgers API as fallback
    const fetchBobsBurgersData = async () => {
      try {
        const bobsUrl = "https://bobsburgers-api.herokuapp.com/characters?limit=20";
        const response = await fetch(bobsUrl);
        
        if (!response.ok) {
          throw new Error(`Bob's Burgers API request failed with status ${response.status}`);
        }
        
        const characters = await response.json();
        
        // Transform the Bob's Burgers API data to match the expected format for our Card component
        const transformedData = characters.map(character => ({
          id: character.id,
          image: character.image,
          title: character.name,
          modified: new Date().toISOString()
        }));
        
        setContainer(transformedData);
        setDataSource("Bob's Burgers API"); // Update data source indicator
      } catch (bobsError) {
        console.error("Error fetching from Bob's Burgers API:", bobsError);
        setContainer([]); // If both APIs fail, set container to empty array
      }
    };

    fetchData();
  }, [endPoint, options]);

  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearText =
    startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;
  
  // State to track which API data is being displayed
  const [dataSource, setDataSource] = useState("Programming Memes API");
  const developer = "Juan Díaz";

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center  pb-2">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Dev Memes</h1>
            <p className="p-2 text-xl md:text-2xl">
              The best memes for developers
            </p>
            <p className="w-full max-w-xs sm:max-w-sm md:w-fit md:text-md py-5 px-2 text-xs text-orange-600">
              A programming Memes Images using Rapid API, React, Vite and
              Tailwind CSS
            </p>
            <div className="mt-2 px-4 py-1 bg-blue-100 rounded-full inline-block">
              <p className="text-sm font-medium text-blue-800">Currently using: {dataSource}</p>
            </div>
          </div>
          <div className="flex justify-center w-full my-8"> {/* Centering and vertical margin */}
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              role="region"
              aria-label="Meme slider"
              style={{
                '--swiper-theme-color': '#3b82f6',
                '--swiper-navigation-color': '#3b82f6',
              }}
              cardsEffect={{
                slideShadows: true,
                perSlideOffset: 8,
                perSlideRotate: 2,
              }}
            >
              {
                (() => {
                  if (Array.isArray(container)) {
                    return container.map((item, index) => (
                      <SwiperSlide
                        key={item.id}
                        role="group"
                        aria-label={`Meme slide ${index + 1}`}
                      >
                        <Card data={item} dataSource={dataSource} />
                      </SwiperSlide>
                    ));
                  } else {
                    console.error('Expected container to be an array at render time, but got:', typeof container, container);
                    return <p>Loading memes or no memes found / error loading memes.</p>;
                  }
                })()
              }
            </Swiper>
          </div>
          <div className="py-4 text-center">
            © {yearText}
            <span className="mx-1">•</span>
            Developed by
            <a
              href="http://jpdiaz.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Website developed by ${developer}`}
              className="p-2 font-bold hover:underline hover:underline-offset-4"
            >
              {" "}
              {developer}
            </a>
          </div>{" "}
        </div>
      </Layout>
    </>
  );
}

export default App;