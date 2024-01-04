import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import Card from "./Components/Card";

function App() {
  // options is required ~ Rapid API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY, // -->> This is the Default API key
      "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
    },
  };

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
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setContainer(result); // setContainer is now an array of objects that contains the data from the API
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [endPoint, options]);

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
          <div className="grid-row grid w-full max-w-screen-sm justify-center gap-4 sm:grid-cols-2 md:max-w-screen-md md:grid-cols-3 lg:max-w-screen-lg xl:max-w-screen-xl">
            {container.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
