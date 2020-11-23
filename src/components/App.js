import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import apiCall from "../services/api";
import CharacterList from "./CharacterList/CharacterList";
import Filters from "./Filters/Filters";
import CharacterDetail from "./CharacterDetail/CharacterDetail";

const App = () => {
  const [characterData, setCharacterData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //Api
  useEffect(() => {
    apiCall().then((data) => setCharacterData(data.results));
  }, []);

  //Events
  const handleFilterInput = (value) => {
    setFilterValue(value);
  };

  //Render
  const renderFilteredCharacters = () => {
    const filteredCharacters = characterData.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filteredCharacters;
  };
  const renderCharacterDetail = (props) => {
    const characterDetailId = parseInt(props.match.params.id);
    const characterDetail = characterData.find(
      (item) => item.id === characterDetailId
    );
    if (characterDetail) {
      return (
        <CharacterDetail
          image={characterDetail.image}
          name={characterDetail.name}
          status={characterDetail.status}
          species={characterDetail.species}
          origin={characterDetail.origin.name}
          episodes={characterDetail.episode.length}
        />
      );
    }
  };
  return (
    <>
      <Filters
        handleFilterInput={handleFilterInput}
        filterValue={filterValue}
      />
      <Switch>
        <Route strict path="/">
          <CharacterList characterData={renderFilteredCharacters()} />
        </Route>
        <Route path="/card/:id" render={renderCharacterDetail} />
      </Switch>
    </>
  );
};

export default App;
