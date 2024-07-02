import React from "react";
import PokemonFrame from "../frames/PokemonFrame";

function PokemonList ({ pokemon }) {
    return (
        <>
            {pokemon.map((pokemon) => (
                <PokemonFrame name={pokemon.name} type ={pokemon.type} description = {pokemon.description}key={pokemon._id} />
            ))};
        </>
    );
}

export default PokemonList