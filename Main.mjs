"use strict";


const ing_limits = [4, 4, 6];
const proteins_limits = [1, 2, 3];

const bases = ["rice", "black rice", "salad"];
const proteins = ["tuna", "chicken", "salmon", "tofu"];
const ingredients = [
    "avocado", "ananas", "cashew nuts", "kale", "mango",
    "peppers", "corn", "wakame", "tomatoes",
    "carrots", "salad"
];

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

function PokeBowl(size) {
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

    this.AddIngredients = function (...list) {
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

    this.AddProteins = function (...list) {
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

    this.showBowl = function () {
        console.log(`Size: ${this.size}`);
        console.log(`Base: ${this.base}`);
        console.log(`Proteins: ${this.BowlProteins.join(", ")}`);
        console.log(`Ingredients: ${this.BowlIngredients.join(", ")}`);
        console.log("\n");
        return this; // Enable chaining if needed
    };
}

// Using an array instead of a dictionary
let pokeBowls = [];

pokeBowls.push(
    PokeBowl("medium").AddIngredients(1, 3, 4, 5).AddProteins(1, 2).ChooseBase("black rice").showBowl(),
    PokeBowl("small").AddIngredients(1, 1, 1, 1).AddProteins(1).ChooseBase("rice").showBowl(),
    PokeBowl("large").ChooseBase("black rice").AddIngredients(1, 2, 3, 1).AddProteins(1, 2, 1).showBowl(),
    PokeBowl("large").ChooseBase("black rice").AddIngredients(1, 1, 2, 1).AddProteins(0, 2, 1).showBowl(),
    PokeBowl("large").ChooseBase("rice").AddIngredients(1, 2, 5, 1).AddProteins(1, 0, 1).showBowl()
);
let onlyLarge = pokeBowls.filter(x => x.size.toLowerCase() === "large");

console.log("Showing only Large pokes -> \n");
onlyLarge.forEach(x=> x.showBowl());

let sortedBySize = pokeBowls.sort((a, b) => 
    ["small", "medium", "large"].indexOf(a.size) - ["small", "medium", "large"].indexOf(b.size)
);
console.log("Showing sorted pokes -> \n");
sortedBySize.forEach(x=> x.showBowl());
