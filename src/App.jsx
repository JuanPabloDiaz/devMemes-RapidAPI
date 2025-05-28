import { useEffect, useState, useMemo, useLayoutEffect } from "react";
import Layout from "./Components/Layout";
import Card from "./Components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

function App() {
  // Disable vertical scrolling
  useLayoutEffect(() => {
    // Save original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Cleanup function to restore original style when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // options is required ~ Rapid API
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
      },
    }),
    [],
  );

  // First element from useState is the state itself (""). The initial value, in this case an empty string
  // Second is the function that will update the state (setEndPoint). The "Changer" function
  const [endPoint, setEndPoint] = useState("");
  // container is an empty array. setContainer is the function that will update the state of the container
  const [container, setContainer] = useState([]);
  // State to track which API data is being displayed
  const [dataSource, setDataSource] = useState("Programming Memes API");

  useEffect(() => {
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
            errorData,
          );
          throw new Error(
            `API request failed with status ${response.status}: ${
              errorData?.message || errorData?.error || response.statusText
            }`,
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
            result,
          );
          setContainer([]);
        }
      } catch (error) {
        console.error(
          "Error during data fetching, parsing, or handling:",
          error,
        );
        console.log("Using Bob's Burgers API as fallback");
        // Fetch data from Bob's Burgers API as fallback
        fetchBobsBurgersData();
      }
    };

    // Function to fetch data from Bob's Burgers API as fallback
    const fetchBobsBurgersData = async () => {
      try {
        const bobsUrl =
          "https://bobsburgers-api.herokuapp.com/characters?limit=20";
        const response = await fetch(bobsUrl);

        if (!response.ok) {
          throw new Error(
            `Bob's Burgers API request failed with status ${response.status}`,
          );
        }

        const characters = await response.json();

        // Transform the Bob's Burgers API data to match the expected format for our Card component
        const transformedData = characters.map((character) => ({
          id: character.id,
          image: character.image,
          title: character.name,
          modified: new Date().toISOString(),
        }));

        setContainer(transformedData);
        setDataSource("Bob's Burgers API");
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

  const developer = "Juan Díaz";

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative mb-6 inline-block">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Dev Memes
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-700/40 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-5 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
            <p className="text-sm font-medium text-blue-200">
              Currently using:{" "}
              <span className="font-bold text-blue-300">{dataSource}</span>
            </p>
          </div>
        </div>

        <div className="my-8 flex w-full justify-center px-4 sm:px-6 md:px-8">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Decorative elements */}
            <div className="absolute -left-6 -top-6 hidden h-12 w-12 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm md:block"></div>
            <div className="absolute -bottom-6 -right-6 hidden h-12 w-12 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm md:block"></div>

            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full"
              role="region"
              aria-label="Meme slider"
              style={{
                "--swiper-theme-color": "#60a5fa",
                "--swiper-navigation-color": "#60a5fa",
              }}
              cardsEffect={{
                slideShadows: true,
                perSlideOffset: 12,
                perSlideRotate: 3,
                shadow: false,
              }}
            >
              {(() => {
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
                  console.error(
                    "Expected container to be an array at render time, but got:",
                    typeof container,
                    container,
                  );
                  return (
                    <p>
                      Loading memes or no memes found / error loading memes.
                    </p>
                  );
                }
              })()}
            </Swiper>
          </div>
        </div>
        <p className="md:text-md mx-auto w-full max-w-xs px-2 py-3 text-xs text-blue-300/80 sm:max-w-sm md:w-fit">
          A collection of programming memes using Rapid API, React, Vite and
          Tailwind CSS
        </p>
        <div className="mt-6 border-t border-gray-700/50 py-8 text-center text-gray-400">
          <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 md:flex-row">
            <span className="text-gray-500">© {yearText}</span>
            <span className="mx-1 hidden text-blue-500/50 md:inline">•</span>
            <span className="text-gray-500">
              Developed by
              <a
                href="http://jpdiaz.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Website developed by ${developer}`}
                className="ml-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-transparent transition-all duration-300 hover:from-blue-300 hover:to-purple-300 hover:underline hover:underline-offset-4"
              >
                {developer}
              </a>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
