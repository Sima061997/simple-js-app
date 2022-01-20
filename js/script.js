let height;
let pokemonTypes = ['electric', ['grass', 'poison'], 'fire'];
let pokemonList = [
              {name: 'Pikachu',  height: 40},                 //height in cm
              {name: 'Ivysaur', height: 100},                //height in cm
              {name: 'Charmander', height: 60},                  //height in cm
                pokemonTypes               
                ];

       for(let i = 0; i < pokemonList.length -1; i++) { 
         if (pokemonList[i].height > 80 ){       
            document.write( pokemonList[i].name + ' (' + 'height:'+ pokemonList[i].height + ')'+   ' -Woww!! It\'s Big' + "<br>")
         }
         else {
            document.write( pokemonList[i].name + ' (' + 'height:'+ pokemonList[i].height + ')' + "<br>")
         }
       }
       