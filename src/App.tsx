import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ywzRequest from "./api/re";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect");

    ywzRequest({
      url: "456456/weather/v001/now?areacode=101010100",
      headers: {
        "X-APISpace-Token": "tdcf8jtz022rfm2mgbwxdlbb2cthdhcy",
        "Authorization-Type": "apikey",
      },
    }).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      res.result.location.country;
      res.result.realtime.text;
    });
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
