
let pokemonRepository = (function () {
         let pokemonList = [];
         let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      
       function add(pokemon){
        if (
          typeof pokemon === "object" &&
          "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
       }
         
       function getAll(){
           return pokemonList;
       }

      function addListItem(pokemon){
         //element 'ul' is selected and 'li', 'button' elements are created

         let pokemonList = document.querySelector('.pokemon-list');
         let listItem = document.createElement('li');   
         let button = document.createElement('button');        
         button.innerText = pokemon.name;

         //class added

         button.classList.add('class-to-button');
         listItem.appendChild(button);
         pokemonList.appendChild(listItem);

        button.addEventListener('click', function (event){
         showDetails(pokemon);
        }) ;
      }
      
      function loadList(){
         return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              
              add(pokemon);
              console.log(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
      }

      function loadDetails(item){
         let url = item.detailsUrl;
         return fetch(url).then(function (response) {
           return response.json();
         }).then(function (details) {
           // Now we add the details to the item
           item.imageUrl = details.sprites.front_default;
           item.height = details.height;
           item.types = details.types;
         }).catch(function (e) {
           console.error(e);
         });
      }
      
      //shows the details of Pokemon clicked

      function showDetails(pokemon){
         pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
         });
      }
      
      return {
         add: add,
         getAll: getAll,
         addListItem: addListItem,
         loadList: loadList,
         loadDetails: loadDetails,
         showDetails: showDetails
      };
      }) ();
      
      pokemonRepository.loadList().then(function () {
         // Now the data is loaded!
         pokemonRepository.getAll().forEach(function (pokemon) {
           pokemonRepository.addListItem(pokemon);
         });
       });
       
      
      