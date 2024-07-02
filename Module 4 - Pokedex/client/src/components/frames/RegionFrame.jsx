import React from "react";

function RegionFrame ({name, type, description}) {
    return(
        <>
            <h3>{name}</h3>
            <p>{type}</p>
            <p>{description}</p>
        </>
    )
}


export default RegionFrame;