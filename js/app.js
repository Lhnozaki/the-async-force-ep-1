"use strict";

// HTML tag variables
let person4Name = document.querySelector("#person4Name");
let person4HomeWorld = document.querySelector("#person4HomeWorld");
let person14Name = document.querySelector("#person14Name");
let person14Species = document.querySelector("#person14Species");
let filmList = document.querySelector("#filmList");

// Create XHR for Vader
const person4XHR = new XMLHttpRequest();
person4XHR.addEventListener("load", requestCharacterName);
person4XHR.open("GET", "https://swapi.co/api/people/4/", true);
person4XHR.send();

// Pull name from API and append to person4Name div
function requestCharacterName() {
  if (this.status === 200) {
    const name = JSON.parse(this.responseText).name;
    person4Name.innerHTML = `<div>Name: ${name}</div>`;

    const home = JSON.parse(this.responseText).homeworld;
    const person4XHR2 = new XMLHttpRequest();
    person4XHR2.addEventListener("load", requestCharacterHome);
    person4XHR2.open("GET", home, true);
    person4XHR2.send();
  } else {
    return false;
  }
}

// Pull homeworld from API and append to person4HomeWorld div
function requestCharacterHome() {
  if (this.status === 200) {
    const home = JSON.parse(this.responseText).name;

    person4HomeWorld.innerHTML = `<div>Home Planet: ${home}</div>`;
  } else {
    return false;
  }
}

// Create XHR for Han Solo
const person14XHR = new XMLHttpRequest();
person14XHR.addEventListener("load", requestCharacterNameAgain);
person14XHR.open("GET", "https://swapi.co/api/people/14/", true);
person14XHR.send();

// Pull name from API and append to HTML
function requestCharacterNameAgain() {
  if (this.status === 200) {
    const name = JSON.parse(this.responseText).name;
    person14Name.innerHTML = `<div>Name: ${name}</div>`;

    const species = JSON.parse(this.responseText).species[0];
    const person14XHR2 = new XMLHttpRequest();
    person14XHR2.addEventListener("load", reqSpecies);
    person14XHR2.open("GET", species, true);
    person14XHR2.send();
  } else {
    return false;
  }
}

// Pull species type from API and append to HTML
function reqSpecies() {
  if (this.status === 200) {
    const speciesType = JSON.parse(this.responseText).name;

    person14Species.innerHTML = `<div>Species: ${speciesType}</div>`;
  } else {
    return false;
  }
}

// Film List XHR
const filmListXHR = new XMLHttpRequest();
filmListXHR.addEventListener("load", showFilms);
filmListXHR.open("GET", "https://swapi.co/api/films/", true);
filmListXHR.send();

function showFilms() {
  if (this.status === 200) {
    let movies = JSON.parse(this.responseText).results;

    movies.forEach(function(e) {
      let title = e.title;
      let planets = e.planets;

      let filmLI = document.createElement("li");
      filmLI.className = "film";
      filmList.appendChild(filmLI);

      let filmH2 = document.createElement("h2");
      filmH2.className = "filmTitle";
      filmH2.innerHTML = title;
      filmLI.appendChild(filmH2);

      let planetsH3 = document.createElement("h3");
      planetsH3.innerHTML = "Planets";
      filmLI.appendChild(planetsH3);

      let filmPlanets = document.createElement("ul");
      filmPlanets.className = "filmPlanets";
      filmLI.appendChild(filmPlanets);

      let planetLI = document.createElement("li");
      planetLI.className = "planet";
      filmPlanets.appendChild(planetLI);

      planets.forEach(function(planet) {
        let planetXHR = new XMLHttpRequest();
        planetXHR.addEventListener("load", getPlanets);
        planetXHR.open("GET", planet, true);
        planetXHR.send();

        function getPlanets() {
          let planetName = JSON.parse(this.responseText).name;

          let planetH4 = document.createElement("h4");
          planetH4.className = "planetName";
          planetLI.appendChild(planetH4);

          let lists = document.createElement("li");
          lists.innerHTML = planetName;
          planetH4.appendChild(lists);
        }
      });
    });
  } else {
    return false;
  }
}
