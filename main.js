const urlApi = "http://gateway.marvel.com";
const urlComics = "/v1/public/comics";
const urlPersonajes = "/v1/public/characters";
const apiKey = "3548d21d53c8e352587d13d82244845b";
const ts = "1";
const hash = "69b9e821ca4be00e73a6fab601fcfc1e";
const autentication = `?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

const $ = (id) => document.getElementById(id);

const contenedorCards = $("contenedor-cards");
const imgInfo = $("img-info");
const infoComicPag = $("info-comic-pag");
const nombreComicInfo = $("nombre-comic-info");
const fechaComicInfo = $("facha-comic-info");
const guionistaComicInfo = $("guionista-comic-info");
const descripcionComicInfo = $("descripcion-comic-info");

const busquedaInput = $("busqueda");
const tipoSelect = $("tipo");
const ordenSelect = $("orden");
const buscarBoton = $("buscar");

const fechaDiv = $("div-fecha");
const guionDiv = $("div-guion");
const descripcionDiv = $("div-descripcion");
const tituloPersonaje = $("titulo-personaje");

const extras = $("extras");

let info = [];

const obtenerComics = async () => {
  let order = ``;
  switch (ordenSelect.value) {
    case "a-z":
      order = `&orderBy=title`;
      break;
    case "z-a":
      order = `&orderBy=-title`;
      break;
    case "mas-nuevos":
      order = `&orderBy=-focDate`;
      break;
    case "mas-viejos":
      order = `&orderBy=focDate`;
      break;
  }

  const parametrosDeBusqueda =
    busquedaInput.value.length > 0
      ? `&titleStartsWith=${busquedaInput.value}`
      : "";

  const response = await fetch(
    urlApi + urlComics + autentication + parametrosDeBusqueda + order,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  info = response.data.results;
};

const obtenerPersonajes = async () => {
  let order = ``;
  switch (ordenSelect.value) {
    case "a-z":
      order = `&orderBy=name`;
      break;
    case "z-a":
      order = `&orderBy=-name`;
      break;
    case "mas-nuevos":
      order = `&orderBy=-modified`;
      break;
    case "mas-viejos":
      order = `&orderBy=modified`;
      break;
  }

  const parametrosDeBusqueda =
    busquedaInput.value.length > 0
      ? `&nameStartsWith=${busquedaInput.value}`
      : "";

  const response = await fetch(
    urlApi + urlPersonajes + autentication + parametrosDeBusqueda + order,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log(response);
  info = response.data.results;
};

function generarTarjeta(infoTarjeta, index) {
  const card = document.createElement("div");

  const onClickFunction =
    tipoSelect.value === "comics"
      ? `mostrarInfoComic(${index})`
      : `mostrarInfoPersonaje(${index})`;

  card.innerHTML = `
   <button class="mx-12" onclick=${onClickFunction}>
            <div
              id="card"
              class="h-[390px] w-[210px] bg-[#dddddd] bg-opacity-80 shadow-lg shadow-stone-600 rounded-lg m-4 p-2 border border-stone-800 flex flex-col"
            >
              <figure
                class="z-10 m-1 object-fill rounded-lg shadow-lg shadow-stone-600 border border-stone-800"
              >
                <img
                  class="h-[260px] w-[185px] object-cover overflow-hidden rounded-lg shadow-lg shadow-stone-600"
                  src="${infoTarjeta.thumbnail.path}.${
    infoTarjeta.thumbnail.extension
  }"
                  alt="comic ejemplo"
                />
              </figure>
              <h3
                class=" text-xs bg-[#e3d363] p-2 shadow-lg shadow-stone-400 border border-black -mt-4 z-20 mr-4 -ml-1"
              >
                ${
                  tipoSelect.value === "comics"
                    ? infoTarjeta.title
                    : infoTarjeta.name
                }
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
  if (tipoSelect.value === "comics") {
    await obtenerComics();
  } else {
    await obtenerPersonajes();
  }
  contenedorCards.innerHTML = "";
  info.map((infoTarjeta, index) => {
    generarTarjeta(infoTarjeta, index);
  });
}

function mostrarInfoComic(index) {
  contenedorCards.classList.add("hidden");
  infoComicPag.classList.remove("hidden");
  const infoTarjeta = info[index];

  imgInfo.src = `${infoTarjeta.thumbnail.path}.${infoTarjeta.thumbnail.extension}`;
  nombreComicInfo.innerText = infoTarjeta.title;
  fechaComicInfo.innerText = infoTarjeta.dates[0].date;
  guionistaComicInfo.innerText = infoTarjeta.creators.items[0].name;
  descripcionComicInfo.innerText = infoTarjeta.description;

  console.log(infoTarjeta);
  obtenerPersonajesDeComics(infoTarjeta.characters);
}

function mostrarInfoPersonaje(index) {
  contenedorCards.classList.add("hidden");
  infoComicPag.classList.remove("hidden");
  const infoTarjeta = info[index];

  imgInfo.src = `${infoTarjeta.thumbnail.path}.${infoTarjeta.thumbnail.extension}`;
  nombreComicInfo.innerText = infoTarjeta.name;
  fechaDiv.classList.add("hidden");
  guionDiv.classList.add("hidden");
  descripcionDiv.classList.add("hidden");
  tituloPersonaje.innerText = "Comics";
}

buscarBoton.addEventListener("click", mostrarTarjetasComics);
mostrarTarjetasComics();

function obtenerPersonajesDeComics(personajes) {
  personajes.items.map(async (item) => {
    const response = await fetch(item.resourceURI + autentication, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    respuestaPersonaje = response.data.results[0];
    console.log(respuestaPersonaje);

    const tarjeta = document.createElement("div");
    tarjeta.classList.add(["flex", "flex-col", "inline-flex"]);
    tarjeta.innerHTML = `
              <figure
                class="h-[180px] w-[100px] z-10 m-1 object-fill rounded-lg shadow-lg shadow-stone-600 border border-stone-800"
              >
                <img
                  id="img-personaje"
                  src="${respuestaPersonaje.thumbnail.path}.${respuestaPersonaje.thumbnail.extension}"
                  alt="img-personaje"
                  class="h-[180px] w-[100px] object-cover overflow-hidden rounded-lg shadow-lg shadow-stone-600"
                />
              </figure>
              <h3
                id="nombre-personaje"
                class="text-xs bg-[#e3d363] p-2 shadow-lg shadow-stone-400 border border-black -mt-9 z-20 ml-4 py-2 px-4 inline block"
              >
                ${respuestaPersonaje.name}
              </h3>;`;

    extras.appendChild(tarjeta);
  });
}
