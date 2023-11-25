// This is my Old App Version

import "./App.css";

function App() {
  // API That I Used: https://rapidapi.com/apidojo/api/imdb8

  const url = "https://imdb8.p.rapidapi.com/auto-complete?q=game";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "db2542358dmsh9f6d5b036b73a56p1ad6dbjsnd4d4bab6da8a",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => {
      const list = data.d;
      // console.log("list: ", list);
      list.map((item) => {
        //   //   console.log("item: ", item);
        const title = item.l;
        const year = item.y;
        const posterImg = item.i.imageUrl;
        // const id = item.id;
        const type = item.q;
        const movie = `<img src="${posterImg}"><h2>${
          ("Title", title)
        }</h2><p>${year}</p><p>${type}</p>`;
        console.log(movie);
        //   document.querySelector(".movies").innerHTML += movie;
      });
    })
    .catch((err) => console.error(err));
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-7xl">Rapid API</h1>
      </div>
    </>
  );
}

export default App;
