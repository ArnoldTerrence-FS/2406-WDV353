import axios from "axios";
// import { NativeBuffer } from "mongoose";

// const API = axios.create({
//     baseURL: "http://api.unsplash.com/search/photos",
// });

const API = Object.create(null);

API.fetchPokemon = async () => {
    const response = await axios.get("http://localhost:3000/pokedex/regions");  
    console.log(response.data);
    return response.data; 
    // return response.data.results;
};

export default API