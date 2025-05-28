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
  // "Changer" function: it change the state of the endPoint variable by taking the value from the input
  const onChangeHandler = (event) => {
    setEndPoint(event.target.value);
  };

  // "Submit" function: it prevent the default behaviour of the form. It won't refresh the page
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submit");
  };

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
        } else if (result && Array.isArray(result.memes)) {
          setContainer(result.memes);
        } else if (result && Array.isArray(result.data)) {
          setContainer(result.data);
        } else {
          console.error(
            "API response is not an array and no known array property (memes, data) was found. Received:",
            result
          );
          setContainer([]);
        }
      } catch (error) {
        console.error("Error during data fetching, parsing, or handling:", error);
        setContainer([]); // Ensure container is reset on any error
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
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center  pb-2">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Dev Memes</h1>
            <p className="p-2 text-xl md:text-2xl">
              The best memes for developers
            </p>
            <p className="md:text-md w-80 py-5 text-xs text-orange-600 md:w-fit">
              A programming Memes Images using Rapid API, React, Vite and
              Tailwind CSS
            </p>
          </div>
          <div className="flex justify-center w-full my-8"> {/* Centering and vertical margin */}
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              role="region" // Add this
              aria-label="Meme slider" // Add this
            >
              {
                (() => {
                  if (Array.isArray(container)) {
                    return container.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        role="group"
                        aria-label={`Meme modified on ${new Date(item.modified).toLocaleDateString()}`}
                      >
                        <Card data={item} />
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
              className="pl-1 font-bold hover:underline hover:underline-offset-4"
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
