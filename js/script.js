      let pokemonRepository = (function () {
         let pokemonList = [
            {name: 'Pikachu',  height: 4,  type: 'electric'},                 //height in m
            {name: 'Ivysaur', height: 10,  type: ['grass', ' poison']},            
            {name: 'Charmander', height: 6, type: 'fire'}  
     ];
      
       function add(pokemon){
          pokemonList.push(pokemon);
       }
        
       function getAll(){
           return pokemonList;
       }
      
      return {
         add: add,
         getAll: getAll
      };
      }) ();
      
      let nameOfPokemon = pokemonRepository.getAll().forEach(function (pokemon) {
         console.log(pokemon.name, "List in My Pokemon");
      })
      
      
      console.log(pokemonRepository.getAll());
      pokemonRepository.add({ name: 'Butterfree', height: 11, type: ['Bug', 'Flying'] });
      
      function addv (){
       if( typeof(pokemonRepository.name) === String  || typeof(pokemonRepository.height) === Number ) {
         return add();      
         }
      }