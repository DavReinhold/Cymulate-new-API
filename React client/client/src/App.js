import React, { useState, useEffect } from "react";
import "./App.css";
import SourcesSelect from "./components/sourcesSelect/sourcesSelect";
import axios from "./axios";

function App() {
  const [selectedSource, setSelectedSource] = useState();
  const [news, setNews] = useState([]);
  const [currTimeLoad, setCurrTimeLoad] = useState(new Date());
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    // delete existing new when the source h\is changed
    setNews([]);

    selectedSource && load();
  }, [selectedSource]);

  const load = async () => {
    setDisableBtn(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}news/getNews`,
      {
        params: {
          source: selectedSource,
          from: new Date(currTimeLoad - 7 * 24 * 60 * 60 * 1000),
          to: currTimeLoad,
        },
      },
    );

    setNews((prev) => [...prev, ...res.data]);

    setCurrTimeLoad((prev) => new Date(prev - 7 * 24 * 60 * 60 * 1000));

    setDisableBtn(false);
  };

  return (
    <div className="App">
      <SourcesSelect setSelected={setSelectedSource} />
      {news.length > 0 &&
        news.map((curr) => (
          <>
            <h4>{curr.title}</h4>
            <br />
            <h6>{curr.description}</h6>
          </>
        ))}
      <button disabled={disableBtn} onClick={load}>
        Load
      </button>
    </div>
  );
}

export default App;
