import { useState } from "react";
import React from 'react';
import SearchBar from './components/forms/SearchBar';
import PokemonList from "./components/lists/PokemonList";

import API from "./API";
import './App.css';


function App() {

  //state
  const [pokemon, setPokemon] = useState([]);


  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search button clicked!",event.target.search.value);
    const PokemonName = event.target.search.value;
    const responsePokemon = await API.fetchPokemon();
    const responsePokemonByName = await API.fetchPokemon(PokemonName);
    const responseRegions = await API.fetchRegions();
    console.log("pokemon name ===>", PokemonName)
    console.log(responsePokemonByName);
    console.log("From our API!", responsePokemon.data);
    console.log("Also from our API", responseRegions.data);
    setPokemon(responsePokemon.data);
  }

  return (
    <>
      <div>
        <h1>Pokemon Search</h1>
        <SearchBar onSubmit={handleSearch} />
      </div>
      {pokemon.length > 0 && <PokemonList pokemon={pokemon}/>}

    </>
  );
}

export default App
