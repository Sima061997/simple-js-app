"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pokemonRepository = function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var modalContainer = document.querySelector('#modal-container');
  /*showModal function shows the Name, Height, Image of Pokemon.  */

  function showModal(title, text, imageUrl) {
    modalContainer.innerHTML = '';
    var modal = document.createElement('div');
    modal.classList.add('modal');
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);
    var titleElement = document.createElement('h1');
    titleElement.innerText = title;
    var contentElement = document.createElement('p');
    contentElement.innerText = text;
    var pokemonImage = document.createElement('img');
    pokemonImage.src = imageUrl;
    modal.appendChild(pokemonImage);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
    loadDetails(pokemon);
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', function (e) {
    //modal gets hide with the click of esc key
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', function (e) {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;

    if (target === modalContainer) {
      hideModal();
    }
  });

  function addListItem(pokemon) {
    //element 'ul' is selected and 'li', 'button' elements are created
    var pokemonList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name; //class to pokemon button added

    button.classList.add('class-to-button');
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
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  return {
    showModal: showModal,
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
}();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});