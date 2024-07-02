import React from "react";
import RegionFrame from "../frame/RegionFrame";

function RegionList ({ region }) {
    return (
        <>
            {region.map((region) => (
                <RegionFrame name={region.name} type ={region.year} description = {region.description}key={region._id} />
            ))};
        </>
    );
}

export default RegionList