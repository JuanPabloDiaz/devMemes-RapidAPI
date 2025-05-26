import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import Card from "./Components/Card";
import SkeletonCard from "./Components/SkeletonCard";
import ErrorDisplay from "./Components/ErrorDisplay"; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

function App() {
  const options = useMemo(() => ({
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
    },
  }), []);

  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [error, setError] = useState(null);
  const [cachedData, setCachedData] = useState(null);
  const [cacheTimestamp, setCacheTimestamp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeHandler = (event) => setEndPoint(event.target.value);
  const onSubmitHandler = (event) => event.preventDefault();

  const validateMemesData = (data) => Array.isArray(data) ? data : [];

  useEffect(() => {
    const url = "https://programming-memes-images.p.rapidapi.com/v1/memes";

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION_MS) {
        setContainer(validateMemesData(cachedData));
        setIsLoading(false);
        return;
      }

      let lastError = null;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            const result = await response.json();
            const validatedResult = validateMemesData(result);
            setContainer(validatedResult);
            setCachedData(validatedResult);
            setCacheTimestamp(Date.now());
            setIsLoading(false);
            return;
          } else {
            lastError = `Attempt ${attempt + 1}: Server responded with ${response.status}`;
            if (attempt === MAX_RETRIES - 1) {
              setError(`Could not load memes. Server responded with ${response.status}.`);
              setContainer([]);
              setIsLoading(false);
            }
          }
        } catch (err) {
          lastError = `Attempt ${attempt + 1}: ${err.message}`;
          if (attempt === MAX_RETRIES - 1) {
            setError("Network or parsing error. Please try again.");
            setContainer([]);
            setIsLoading(false);
          }
        }

        if (attempt < MAX_RETRIES - 1) {
          const delay = INITIAL_BACKOFF_MS * 2 ** attempt;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    fetchData();
  }, [endPoint, options]);

  const handleRetry = () => fetchData();

  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearText = startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;
  const developer = "Juan Díaz";

  const swiperBreakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
    1280: { slidesPerView: 4, spaceBetween: 50 },
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Dev Memes</h1>
          <p className="p-2 text-xl md:text-2xl">The best memes for developers</p>
          <p className="md:text-md w-80 py-5 text-xs text-orange-600 md:w-fit">
            A programming Memes Images using Rapid API, React, Vite and Tailwind CSS
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center space-x-4 p-4 w-full max-w-screen-xl">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!isLoading && error && (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        )}

        {!isLoading && !error && container.length === 0 && (
          <div className="text-center p-10">
            <p className="text-xl text-gray-500">
              No memes to display at the moment. Try refreshing later!
            </p>
          </div>
        )}

        {!isLoading && !error && container.length > 0 && (
          <div className="w-full max-w-screen-xl py-4 px-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={swiperBreakpoints}
              loop={container.length > (swiperBreakpoints['1280']?.slidesPerView || 4)}
              slidesPerView={1}
              spaceBetween={30}
            >
              {container.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex justify-center h-full">
                    <Card data={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

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
            {developer}
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default App;