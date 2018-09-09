//This object contains all properties for the year selector, 
//it limits the number of film that will be included in a single instance of the game
var year = {
    
    //The next set of properties are related to limiting the starting year for films to include
    //The "number" array indexes valid entries, which are all single digit numbers
    number : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],

    //The "since" property shows the limiting date and starts as a semantically appropriate string
    since : "... ",

    //The next set of properties are functions related to calculating and resetting "since"
    pos : [".", ".", ".", ""], //The last "pos" value is left blank intentionally for presentation purposes

    //Finally, the current year helps us calculate the maximum number of films to include
    current : + (new Date()).getFullYear(), //Note: it spits out a number, not a string
    

    //The edit function customizes the year.since property
    edit : function (){
        //First it clears the "since property" with blank strings
        this.pos[0] = " "; this.pos[1] = " "; this.pos[2] = " "; this.pos[3] = " ";
        this.show() //confirm
        //Next, we set a variable to serve as the limit of loops to move across indexes in the "pos" array
        j=0; //it starts at zero
        //The function listens for key presses
        document.onkeyup = function(){
            //The cycle will stop after 4 loops (a.k.a, valid inputs)
            if(j>3) game.start(); //pressing any key after 4 loops checks if the game can start
            if(j>3) return; //likewise, the fourth loop stops the edit function
            //Otherwise, if the edit can continue, each key press is registered
            year.pos[j] = event.key;
            //And we use a for loop to filter out invalid inputs
            for(k=0;k<10;k++) {
                //this additional variable will help us confirm that the input is a number
                jj=j; //At the beginning of the loop, it matches "j"
                //If the input is valid (is part of the number array), "j" increases by one
                if (year.pos[j] === year.number[k]) j++; 
                //if the additional variable no longer matches "j", the input is logged
                if(jj!=j) console.log(year.show()); //confirm
            }
        }
    },

    //The "show" function makes "since" display a date as per the values in the "pos" array.
    show : function (){
        //Because "pos" are strings, they will be presented side by side, not as a sum
        this.since = this.pos[0] + this.pos[1] + this.pos[2] + this.pos[3];
        console.log(this.since); //confirm
    },    

    //The "all" function calls best picture winners since 1928, the first year of the academy awards   
    all : function(){ //It does this by setting the "since" property to 1928 via the "pos" array
        this.pos[0] = "1"; this.pos[1] = "9"; this.pos[2] = "2"; this.pos[3] = "8";
        if(this.since = "1928") game.start(); //if the function is succesful, the game can start!
        this.show(); //confirm
    },

    //This is function more of a dev tool and will likely not be used in this version of the game
    //The "reset" function resets "since" to its initial state ("... ")
    reset : function(){
        for(i=0;i<3;i++) {
            this.pos[i] = ".";
        }
        this.pos[3] = ""; //Left blank intentionally
        this.show(); //confirm
    },
};


var game = {
    start : function (){
        //Valid inputs are determined by the range of years in the oscars' lifetime
        if (year.since > 1928 -1 && year.since < year.current) this.on = true; //Within range? The game can start!
        if (year.since < 1928) alert ("The academy awards didn't exist back then :P"); //Reject anything below 1928
        if (year.since > year.current-1) alert("Hey now, that hasn't happened yet!"); //Reject anything above the current year
        //Non-starters send the player back into the year.edit function
        if (this.on === false) year.edit();
        //If the game can start, the game calls the game.play function
        console.log(this.on); //confirm
        if (this.on === true) this.load(); //trigger a random film selection
        return; //end function
    },
};

console.log("The current year is " + year.current);
console.log("Include films since " + year.since);