import axios from "axios";
// import { NativeBuffer } from "mongoose";

// const API = axios.create({
//     baseURL: "http://api.unsplash.com/search/photos",
// });

const API = Object.create(null);

// Get all Pokemon & Region

API.fetchPokemon = async () => {
    const response = await axios.get("http://localhost:3000/pokedex/pokemon");  
    console.log(response.data);
    return response.data; 
    // return response.data.results;
};

API.FetchPokemonByName = async (name) => {
    const response = await axios.get("http://localhost:3000/pokedex/pokemon?name="+name);
    return "hello";
}

API.fetchRegions = async () => {
    const response = await axios.get("http://localhost:3000/pokedex/regions");
    console.log(response.data);
    return response.data;
    // return rsponse.data.results
}

export default API