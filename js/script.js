
let pokemonRepository = (function () {
         let pokemonList = [
            {name: 'Pikachu',  height: 0.4,  type: 'electric'},                 //height in m
            {name: 'Ivysaur', height: 1,  type: ['grass', ' poison']},            
            {name: 'Charmander', height: 0.6, type: 'fire'}  
     ];
      
       function add(pokemon){
          pokemonList.push(pokemon);
       }
         
       function getAll(){
           return pokemonList;
       }

      function addListItem(pokemon){
         //element 'ul' is selected and 'li', 'button' elements are created

         let variable = document.querySelector('ul');
         let listItem = document.createElement('li');   
         let button = document.createElement('button');        
         button.innerText = pokemon.name;

         //class added

         button.classList.add('class-to-button');
         listItem.appendChild(button);
         variable.appendChild(listItem);

        button.addEventListener('click', function (pokemon){
         showDetails(pokemon);
        } ) 
      }
       //shows the details of Pokemon clicked

      function showDetails(pokemon){
         console.log(pokemon);
      }
      
      return {
         add: add,
         getAll: getAll,
         addListItem: addListItem,
         showDetails: showDetails
      };
      }) ();
      //a Pokemon added on the given array

      pokemonRepository.add({ name: 'Butterfree', height: 1.1, type: ['Bug', 'Flying'] });
      console.log(pokemonRepository.getAll());
      
      function addv (){
       if( typeof(pokemonRepository.name) === String  || typeof(pokemonRepository.height) === Number ) {
         return add();      
         }
      }

      let nameOfPokemon = pokemonRepository.getAll().forEach(function (pokemon) {
         
         pokemonRepository.addListItem(pokemon);
      })