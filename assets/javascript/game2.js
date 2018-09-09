var game = {

    //These are all of the films. They are indexed in reverse release order to facilitate filtering by year
    poster : ["WINGS", "THE BROADWAY MELODY", "ALL QUIET ON THE WESTERN FRONT", "CIMARRON", "GRAND HOTEL", "CAVALCADE", "IT HAPPENED ONE NIGHT", "MUTINY ON THE BOUNTY", "THE GREAT ZIEGFELD", "THE LIFE OF EMILE ZOLA", "YOU CAN'T TAKE IT WITH YOU", "GONE WITH THE WIND", "REBECCA", "HOW GREEN WAS MY VALLEY", "MRS. MINIVER", "CASABLANCA", "GOING MY WAY", "THE LOST WEEKEND", "THE BEST YEARS OF OUR LIVES", "GENTLEMAN'S AGREEMENT", "HAMLET", "ALL THE KING'S MEN", "ALL ABOUT EVE", "AN AMERICAN IN PARIS", "THE GREATEST SHOW ON EARTH", "FROM HERE TO ETERNITY", "ON THE WATERFRONT", "MARTY", "AROUND THE WORLD IN 80 DAYS", "THE BRIDGE ON THE RIVER KWAI", "GIGI", "BEN-HUR", "THE APARTMENT", "WEST SIDE STORY", "LAWRENCE OF ARABIA", "TOM JONES", "MY FAIR LADY", "THE SOUND OF MUSIC", "A MAN FOR ALL SEASONS", "IN THE HEAT OF THE NIGHT", "OLIVER!", "MIDNIGHT COWBOY", "PATTON", "THE FRENCH CONNECTION", "THE GODFATHER", "THE STING", "THE GODFATHER PART II", "ONE FLEW OVER THE CUCKOO'S NEST", "ROCKY", "ANNIE HALL", "THE DEER HUNTER", "KRAMER VS. KRAMER", "ORDINARY PEOPLE", "CHARIOTS OF FIRE", "GANDHI", "TERMS OF ENDEARMENT", "AMADEUS", "OUT OF AFRICA", "PLATOON", "THE LAST EMPEROR", "RAIN MAN", "DRIVING MISS DAISY", "DANCES WITH WOLVES", "THE SILENCE OF THE LAMBS", "UNFORGIVEN", "SCHINDLER'S LIST", "FORREST GUMP", "BRAVEHEART", "THE ENGLISH PATIENT", "TITANIC", "SHAKESPEARE IN LOVE", "AMERICAN BEAUTY", "GLADIATOR", "A BEAUTIFUL MIND", "CHICAGO", "THE LORD OF THE RINGS: THE RETURN OF THE KING", "MILLION DOLLAR BABY", "CRASH", "THE DEPARTED", "NO COUNTRY FOR OLD MEN", "SLUMDOG MILLIONAIRE", "THE HURT LOCKER", "THE KING'S SPEECH", "THE ARTIST", "ARGO", "12 YEARS A SLAVE", "BIRDMAN OR (THE UNEXPECTED VIRTUE OF IGNORANCE)", "SPOTLIGHT", "MOONLIGHT", "THE SHAPE OF WATER"],

    
    //The "teaser" property is simply a placeholder string to hold selections on the backend (a.k.a the transition between poster and premiere)
    teaser : "",

    //The "trailer" array will be used to display the word as blanks. "_"
    trailer : [],

    //In the "premiere" array we hold the films that have already been used.
    premiere : [],

    //The review property holds the final comparisson between the player responses and the film name to guess
    review: "",

    //The next set of properties contain arrays related to player guesses and inputs
    //The letter property will help filter acceptable inputs
    letter : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    lettered : [],


    answers : "",
    playerGuess :  "",
    results :  [],


    win : 0,
    miss : 10,
    project : document.getElementById("project-word"),
    guessElement : document.getElementById("guessed-letters"),
    winElement : document.getElementById("win-count"),
    lossElement : document.getElementById("loss-count"),
    gameOff : false,
    gameOn : true,
    
};  


// for(var i = 0; i < game["poster"].length; i++){
//    console.log ("Movie " + game.poster[i]);
// }


var cartoonElement = function () {

       document.onkeyup = function(){
           game.guess = event.key;

               game.teaser  = game.poster [Math.floor(Math.random() * game["poster"].length)];
               console.log (game.guess);

               game.trailer = game["teaser"].split("");
               console.log (game.trailer);

               for(var j = 0; j < game["trailer"].length; j++){
                    for(var k = 0; k < game["letter"].length; k++){
                    if(game.trailer[j]===game.letter[k])game.trailer[j] = "_";
                    game["project"].textContent = game.trailer;
                   }
               }

           console.log(game.trailer);

           keyPress();

          return;
       }

}


var keyPress = function(){

   document.onkeyup = function(){

       game.guess = event.key;
       game.guess = game.guess.toUpperCase();
       guessLetter.splice(event.key);


       for( var l = 0; l < game.teaser.length; l++){
            if (game["teaser"].indexOf[l] === game.guess){
                game.trailer[l]=game.guess;
           }
       }
       console.log(game.guess);
       guessElement.textContent = game.guess;

       review();
       return;


   }
}


var review = function(){

   for (var m = 0; m < game["trailer"].length; c++){
       if (game.guess === game["teaser"].charAt(m)) game.trailer[m] = game.guess;
       if (game.teaser[m]=== game.guess){
       game.trailer[m] = game.guess;
       wordElement.textContent = game.trailer;
       }
   }

  var answers = game["trailer"].join("");
  console.log("-" + answers + "-");
  document.getElementById("word-display-letters");


  if (answers === game.teaser){

      wins++;
      lossCount=10;
      console.log(wins);
      cartoonElement();

   }else{
       lossCount --;
       console.log(lossCount);
   }

   if (lossCount=== 0){
       lossCount=10;
       cartoonElement();
   }



   document.getElementById("win-count").textContent = wins;
   document.getElementById("loss-count").textContent = lossCount;



}