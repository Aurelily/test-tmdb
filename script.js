// Elements HTML
const resultList = document.querySelector("#resultList")
const detailInfos = document.querySelector("#detailInfos")
const poster = document.querySelector("#poster")

// Je récupère l'URL des pages pour savoir où je me trouve
const url = new URL(window.location.href); // Récupérer l'URL actuelle


// console.log(url.href);

// API Key
const myApiKey  = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjFkNGQ3ZDFkMzMwMDk1NDcwYjEyMzNiN2ZiZDZlZSIsInN1YiI6IjY2MjUzNzgwZTI5NWI0MDE4NzlhZjYwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zhQ_dDOCNjmPa3p1rMn68uoMtjeRHDjLMcLJmjySzCk"
//const myApiKey = "8c4b867188ee47a1d4e40854b27391ec" // Token William



// FONCTIONS
// -------------------------------------------------------------

const getMovieById = async (movieId) => {
  // Définir les options pour le fetch
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myApiKey,
    },
  };

  try {
    // Faire le fetch avec les options définies
    const response = await fetch('https://api.themoviedb.org/3/movie/'+movieId, options);

    // Si la réponse n'est pas OK, lancer une erreur
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des films : ${response.statusText}`);
    }

    // Extraire les données de la réponse JSON
    const data = await response.json();

    // Retourner les infos du film trouvé
    return data;

  } catch (err) {
    // Gérer les erreurs éventuelles
    console.error(err);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

const getAllMovies = async () => {
  // Définir les options pour le fetch
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myApiKey,
    },
  };

  try {
    // Faire le fetch avec les options définies
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);

    // Si la réponse n'est pas OK, lancer une erreur
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des films : ${response.statusText}`);
    }

    // Extraire les données de la réponse JSON
    const data = await response.json();

    // Retourner les résultats des films
    return data.results;

  } catch (err) {
    // Gérer les erreurs éventuelles
    console.error(err);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};

const getMoviesByKeyword = async (keyword) => {
  // Définir les options pour le fetch
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myApiKey,
    },
  };

  try {
    // Faire le fetch avec les options définies
    const response = await fetch('https://api.themoviedb.org/3/search/movie?query='+keyword+'&include_adult=false&language=en-US&page=1', options);

    // Si la réponse n'est pas OK, lancer une erreur
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des films : ${response.statusText}`);
    }

    // Extraire les données de la réponse JSON
    const data = await response.json();

    // Retourner les résultats des films trouvés pour ce mot clé
    return data.results;

  } catch (err) {
    // Gérer les erreurs éventuelles
    console.error(err);
    return []; // Retourner un tableau vide en cas d'erreur
  }
};




// HOME PAGE  : AFFICHER TOUS LES MOVIES EN LISTE CLIQUABLE
// --------------------------------------------------------------
if(url.pathname.includes("index")){

  (async () => {
    const movies = await getAllMovies(); // Attendre que la liste des films soit chargée
    console.log('Liste des films :', movies); // Afficher la liste de tous les films
  
    // Affichage de la liste en html
    for(let i = 0; i<movies.length ;i++){   
      
      // Pour chaque film je crée un élément <li></li> avec un button ex. : <button id="823464">Godzilla x Kong: The New Empire</button>
      let listItem = document.createElement("li");
      //listItem.innerHTML = '<button id="'+movies[i].id+'">'+ movies[i].original_title+ '</button>'
      listItem.innerHTML = '<a href="detail.html?id='+movies[i].id+'">'+movies[i].original_title+'</a>'
      resultList.appendChild(listItem);
  
    }
  })();
}



// PAGE DETAIL : AFFICHER LES DETAILS D'UN MOVIE VIA SON ID DANS L'URL
// --------------------------------------------------------------------
if(url.pathname.includes("detail")){
  (async () => {

    const params = new URLSearchParams(url.search); // Extraire les paramètres de l'URL

    if(params){
        // Récupérer un paramètre spécifique par son nom
        const param1 = params.get('id'); // '?id=xxxxx'
        
        if(param1){
      
          console.log('Paramètre 1 :', param1);
      
          const infos = await getMovieById(param1); // Attendre que les infos soient chargées
          console.log('Les infos du film id: '+param1+' sont :', infos); // Afficher les infos du film
  
          poster.src = 'https://image.tmdb.org/t/p/w300'+infos.poster_path;
          detailInfos.innerHTML = '<li>'+infos.original_title+'</li>'
  
        }else{
          console.log("pas de parametres");
        }
  
    }
  })();

}



/* 
(async () => {
  const movie = await getMovieById(12); // Attendre que les infos soient chargées
  console.log('Le film 12 est :', movie); // Afficher les infos du film id=12
})();


(async () => {
  const searchresult = await getMoviesByKeyword("neverending"); // Attendre que la liste des films trouvés soit chargée
  console.log('Les resultats pour ce mot clé sont :', searchresult); // Afficher la liste des films trouvés
})(); */