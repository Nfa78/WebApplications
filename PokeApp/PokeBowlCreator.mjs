"use strict";



const ing_limits = [4, 4, 6];
const proteins_limits = [1, 2, 3];
function getLimit_Ingredients(size) {
    let sizes = ["small", "medium", "large"];
    let index = sizes.indexOf(size.toLowerCase());
    return index !== -1 ? ing_limits[index] : 0;
}

function getLimit_Proteins(size) {
    let sizes = ["small", "medium", "large"];
    let index = sizes.indexOf(size.toLowerCase());
    return index !== -1 ? proteins_limits[index] : 0;
}

export function PokeBowl(size) {

    const bases = ["rice", "black rice", "salad"];
const proteins = ["tuna", "chicken", "salmon", "tofu"];
const ingredients = [
    "avocado", "ananas", "cashew nuts", "kale", "mango",
    "peppers", "corn", "wakame", "tomatoes",
    "carrots", "salad"
];


 

    if (!(this instanceof PokeBowl)) {
        return new PokeBowl(size); // Ensure function is called with 'new'
    }

    this.size = size;
    this.base = "rice"; // Default base
    this.BowlIngredients = [];
    this.BowlProteins = [];

    this.ChooseBase = function (b) {
        let option = String(b).toLowerCase();
        if (bases.includes(option)) {
            this.base = option;
        } else {
            console.log("Invalid base choice.");
        }
        return this; // Enable chaining
    };

    PokeBowl.prototype.AddIngredients = function (...list) {
        let limit = getLimit_Ingredients(this.size);
        if (list.length > limit) {
            console.log("Too many ingredients requested. Allowed:", limit);
            return this;
        }

        for (let i of list) {
            if (i >= 0 && i < ingredients.length) {
                this.BowlIngredients.push(ingredients[i]);
            } else {
                console.log("Ingredient index selected doesn't exist");
            }
        }
        return this; // Enable chaining
    };

    PokeBowl.prototype.AddProteins = function (...list) {
        let limit = getLimit_Proteins(this.size);
        if (list.length > limit) {
            console.log("Too many proteins requested. Allowed:", limit);
            return this;
        }

        for (let i of list) {
            if (i >= 0 && i < proteins.length) {
                this.BowlProteins.push(proteins[i]);
            } else {
                console.log("Protein index selected doesn't exist");
            }
        }
        return this; // Enable chaining
    };

    PokeBowl.prototype.showBowl = function () {
        console.log(`Size: ${this.size}`);
        console.log(`Base: ${this.base}`);
        console.log(`Proteins: ${this.BowlProteins.join(", ")}`);
        console.log(`Ingredients: ${this.BowlIngredients.join(", ")}`);
        console.log("\n");
        return this; // Enable chaining if needed
    };

    PokeBowl.prototype.getIngredients = function (){
        return this.BowlIngredients;
    }
    PokeBowl.prototype.getProtiens = function(){
        return this.BowlProteins;
    }
    PokeBowl.prototype.getBase = function(){
        return this.base;
    }
    PokeBowl.prototype.getSize =function() {
        return this.size;
    }
}