//Here be html related variables n stuff
var trailerScreen = document.getElementById("game-trailer");


//This object contains all properties for the the hangman game itself
var game = {

    //The game starts in its off position
    on : false,

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

    //Also, "entries" and "guesses" are declared as strings, just to be safe
    entry : "",
    guess : "",
    guessed : document.getElementById("guessed-chars"),

    //Then, we track the number of attempts left (6, as per traditional hangman)
    attempt : 0,
    //Finally, the game tracks the winning streak as a property
    streak : 0,

    //These last couple are related to modifying the html document
    screen : document.getElementById("project-word"),
    hits : document.getElementById("win-count"),
    lives: document.getElementById("life-count"),

    //The game will start after pressing any key
    tickets : function (){
        document.onkeyup = function(){
            game.on = true //the game turns on
            console.log("Start? " + game.on); //confirm
            game.letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            game.lettered=[];
            //If the game can start, the game calls the game.play function
            return game.load(); //trigger a random film selection
        };
    },        

    //The "load" function pulls a random title from the "film" array and sets up the "teaser" and "trailer" properties
    load : function(){
        //First we set a variable to track our position in the "poster" array
        x = Math.floor((Math.random() * this["poster"].length));
        //If the game is on, it selects a random film from the "poster" array
        if (this.on === true) this.teaser = this.poster[x];
        else this.tickets; //Trigger the "tickets" function if the game wasn't on after all
        console.log(this.teaser); //confirm the "teaser"
        //This causes the film to be spliced from the "poster" array
        this.poster.splice(x,1);
        console.log(this["poster"].length + 1 + " movies to go!"); //confirm
        //And then placed in the "premiere" array, preventing it from being selected in the future
        this.premiere.splice(0,0,this.teaser); 
        console.log(this["premiere"].length); //confirm

        //Here we manage dynamic difficulty based on the net length of each film title, with maximums and minimums to prevent it from getting out of hand
        this.attempt = this.teaser.length;
        if(this.attempt>8) this.attempt = 8;
        if(this.attempt<4) this.attempt = 4;
        console.log(this.attempt + " attempts left.");
        return this.project(); //endfunction


    },
 
    //The "project" function displays the film title to guess. 
    //Also, it should be noted that I just learned about .split() and it probably would've helped in other functions that we will not be revisiting in the spirit of being prudent with time :P
    project : function (){
        //First the "teaser" string is .split() into "trailer" array
        this.trailer = this["teaser"].split("");
        console.log(this.trailer); //confirm

        //Then we set up a for loop to cycle through each string in the newly populated "trailer" array
        for (y=0;y<game["trailer"].length;y++){
            // A second for loop checks if each index in the "trailer" array matches any of the acceptable "letters"
            for (z=0;z<game["letter"].length;z++){
                // If it does, then it gets turned into an underscore
                if(game.trailer[y] ===  game.letter[z]) game.trailer[y] = "_";
            } 
        }
        console.log(this.trailer); //confirm

        this.review = this["trailer"].join("");
        this["screen"].textContent = this.review;

        return this.typed(); //This triggers the "play function"
    },

    //The play function registers a player "entry"
    typed : function (){  
        //The game listens for key presses
        if (this.on = true) document.onkeyup = function(){
            //Key presses are logged as "entries" 
            game.entry = event.key;
            //"entries" are standardized in uppercase letters
            game.entry = game["entry"].toUpperCase();
            m=false; //This variable will change with every iteration if the "entry" is valid
            //A for loop checks the "entry" against the accepted letters
            for(l=0;l<game["letter"].length;l++) {
                if (game.entry === game.letter[l]) {
                    game["letter"].splice(l,1);
                    game["lettered"].splice(0,0,game.letter[l]);
                    console.log(game["letter"].length + " " + game["lettered"].length)
                    m=true; //If the entry is valid, "m" moves forward
                    //And the mismatch with our anchor signals that it is a valid "guess"
                    if(m=true) game.guess = game.entry; 
                };
            };;
            console.log(game.guess); //confirm

            game["guessed"].textContent = "Guesses: " + game.entry;

            return game.watch();
        };
    },

    //Now that we have a valid guess, we can see if it is a valid answer.
    watch : function () {

        nn=false;

        for (n=0;n<this["teaser"].length;n++){
            if(game.guess === game["teaser"].charAt(n)) {
                game.trailer[n] = game.guess;
                nn=true;
            }
        };

        if (nn=false) this.attempt = this.attempt -1;
        console.log(nn + this.attempt + " attempts left - why won't it go dooooooown!!!!");

        this["lives"].textContent = "Tickets left: " + this.attempt;



        this.review = this["trailer"].join("");
        console.log(this.review); //confirm

        this["screen"].textContent = this.review;

        if (this.review === this.teaser){
            game.on = false;
            console.log("Got it!");
            game.streak++;
            console.log("Streak: " + game.streak);

            game["hits"].textContent = "Streak: " + this.streak;

            return game.tickets();
        };

        return game.typed;
    },

};

console.log("Start? " + game.on);
console.log("Lights! Camera! (press any key to) ACTION!");
game.tickets();