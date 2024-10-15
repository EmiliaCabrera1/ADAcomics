const urlApi = "http://gateway.marvel.com";
const urlComics = "/v1/public/comics";
const urlPersonajes = "/v1/public/characters";
const apiKey = "3548d21d53c8e352587d13d82244845b";
const ts = "1";
const hash = "69b9e821ca4be00e73a6fab601fcfc1e";
const autentication = `?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

const $ = (id) => document.getElementById(id);

const contenedorCards = $("contenedor-cards");
const nombreComicInfo = $("nombre-comic-info");
const fechaComicInfo = $("facha-comic-info");
const guionistaComicInfo = $("guionista-comic-info");
const descripcionComicInfo = $("descripcion-comic-info");

let info = [];

const obtenerComics = async () => {
  const response = await fetch(urlApi + urlComics + autentication, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(response);
  info = response.data.results;
};

function generarTarjeta(nombre, imagen) {
  const card = document.createElement("div");
  card.innerHTML = `
   <button class="mx-12" onclick = >
            <div
              id="card"
              class="h-[390px] w-[210px] bg-[#dddddd] bg-opacity-80 shadow-lg shadow-stone-600 rounded-lg m-4 p-2 border border-stone-800 flex flex-col"
            >
              <figure
                class="z-10 m-1 object-fill rounded-lg shadow-lg shadow-stone-600 border border-stone-800"
              >
                <img
                  class="h-[260px] w-[185px] object-cover overflow-hidden rounded-lg shadow-lg shadow-stone-600"
                  src="${imagen}"
                  alt="comic ejemplo"
                />
              </figure>
              <h3
                class=" text-xs bg-[#e3d363] p-2 shadow-lg shadow-stone-400 border border-black -mt-4 z-20 mr-4 -ml-1"
              >
                ${nombre}
              </h3>
              <div class="h-full relative">
                <img
                  src="./img-ico/puntos-card.svg"
                  alt="puntos-card"
                  class="w-[40px] absolute bottom-0 right-0"
                />
              </div>
            </div>
          </button>
  `;

  contenedorCards.appendChild(card);
}

async function mostrarTarjetasComics() {
  await obtenerComics();
  info.map((infoTarjeta) => {
    console.log(infoTarjeta);
    generarTarjeta(
      infoTarjeta.title,
      `${infoTarjeta.thumbnail.path}.${infoTarjeta.thumbnail.extension}`
    );
  });
}

function mostrarInfoComic() {}

mostrarTarjetasComics();
