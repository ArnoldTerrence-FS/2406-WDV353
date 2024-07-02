import React from 'react';
import { useState } from "react";

function SearchBar({ onSubmit }) {
    const [term, setTerm] = useState("");

    const handleChange = event => {
        console.log("event.target.value:", event.target.value);
        setTerm(event.target.value);
    };

    return (
        <>
            <h3>Search Pokemon name</h3>
            <form onSubmit = {onSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={term}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
        </>
    );
}

export default SearchBar