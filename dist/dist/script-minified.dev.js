"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pokemonRepository = function () {
  var t = [],
      e = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function o(e) {
    "object" == _typeof(e) && "name" in e ? t.push(e) : console.log("pokemon is not correct");
  }

  function n(t) {
    var e = t.detailsUrl;
    return fetch(e).then(function (t) {
      return t.json();
    }).then(function (e) {
      t.imageUrl = e.sprites.front_default, t.height = e.height, t.types = e.types;
    })["catch"](function (t) {
      console.error(t);
    });
  }

  function i(t) {
    pokemonRepository.loadDetails(t).then(function () {
      l(t), console.log(t);
    });
  }

  function l(t) {
    var e = $(".modal-header"),
        o = $(".modal-title"),
        i = $(".modal-body");
    o.empty(), i.empty();
    var l = $("<h1>" + t.name + "</h1>"),
        a = $('<img class="modal-img" style="width:50%">');
    a.attr("src", t.imageUrl);
    var r = $("<p>height : " + t.height + "</p>");
    o.append(l), e.append(o), i.append(r), i.append(a), n(t);
  }

  return {
    addListItem: function addListItem(t) {
      var e = document.querySelector(".list-group"),
          o = document.createElement("li");
      o.classList.add("group-list-item");
      var n = document.createElement("button");
      n.innerText = t.name, n.classList.add("btn-primary"), n.setAttribute("data-bs-target", "#exampleModal"), n.setAttribute("data-bs-toggle", "modal"), o.appendChild(n), e.appendChild(o), n.addEventListener("click", function (e) {
        i(t);
      });
    },
    add: o,
    getAll: function getAll() {
      return t;
    },
    loadList: function loadList() {
      return fetch(e).then(function (t) {
        return t.json();
      }).then(function (t) {
        t.results.forEach(function (t) {
          var e = {
            name: t.name,
            detailsUrl: t.url
          };
          o(e), console.log(e);
        });
      })["catch"](function (t) {
        console.error(t);
      });
    },
    loadDetails: n,
    showDetails: i,
    showModal: l
  };
}();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});