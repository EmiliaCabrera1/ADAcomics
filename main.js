const urlApi = "http://developer.marvel.com";
const urlPersonajes = "/v1/public/characters";
const apiKey = "3548d21d53c8e352587d13d82244845b";
const ts = "1";
const hash = "69b9e821ca4be00e73a6fab601fcfc1e";
const autentication = `?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

fetch(urlApi + urlPersonajes + autentication, {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => console.log(response.data.result))
  .catch((error) => console.error(error));
