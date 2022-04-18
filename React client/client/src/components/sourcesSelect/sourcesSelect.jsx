import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Select from "react-select";

const SourcesSelect = (props) => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    getSources();
  }, []);

  const getSources = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}sources/getAll`,
    );

    setSources(res.data);
  };

  return (
    <div>
      {sources.length > 0 && (
        <Select
          options={sources.map((curr) => {
            return { value: curr.name, label: curr.name };
          })}
          onChange={(e) => props.setSelected(e.value)}
        />
      )}
    </div>
  );
};

export default SourcesSelect;
