import React from "react";

function PokemonFrame ({name, type, description}) {
    return(
        <>
            <h3>{name}</h3>
            <p>{type}</p>
            <p>{description}</p>
        </>
    )
}


export default PokemonFrame;