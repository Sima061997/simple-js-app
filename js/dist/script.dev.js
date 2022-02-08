"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pokemonRepository = function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
    //element 'ul' is selected and 'li', 'button' elements are created
    var pokemonList = document.querySelector('.list-group');
    var listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    var button = document.createElement('button');
    button.innerText = pokemon.name; //class and attribute to pokemon button added

    button.classList.add('btn-primary');
    button.setAttribute('data-bs-target', '#exampleModal');
    button.setAttribute('data-bs-toggle', 'modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function add(pokemon) {
    if (_typeof(pokemon) === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    })["catch"](function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    })["catch"](function (e) {
      console.error(e);
    });
  } //shows the details of Pokemon clicked


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon, 'listInModal');
    });
  }
  /*showModal function shows the Name, Height, Image of Pokemon.  */


  function showModal(pokemon) {
    var modalHeader = $(".modal-header");
    var modalTitle = $(".modal-title");
    var modalBody = $(".modal-body"); //clear existing content of the modal

    modalTitle.empty();
    modalBody.empty(); //creating element for the name" in modal content

    var nameElement = $("<h1>" + pokemon.name + "</h1>"); // creating img in modal content

    var imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrl); //creating element for height in modal content

    var heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    modalTitle.append(nameElement);
    modalHeader.append(modalTitle);
    modalBody.append(heightElement);
    modalBody.append(imageElement);
  }

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
}();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});