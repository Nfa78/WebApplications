'use strict'
import {PokeBowl} from './PokeBowlCreator.mjs'
import { addPokeBowl } from './StoreInDB.mjs';
import { deleteAllData } from './DeleteFromDB.mjs';
import { getAllPokeBowls } from './GetFromDB.mjs';
// Using an array instead of a dictionary

//await deleteAllData();
let pokeBowls = [];
pokeBowls = await getAllPokeBowls()
console.log(pokeBowls)

/*
pokeBowls.push(
    new PokeBowl("medium").AddIngredients(1, 3, 4, 5).AddProteins(1, 2).ChooseBase("black rice").showBowl(),
    new PokeBowl("small").AddIngredients(1, 1, 1, 1).AddProteins(1).ChooseBase("rice").showBowl(),
    new PokeBowl("large").ChooseBase("black rice").AddIngredients(1, 2, 3, 1).AddProteins(1, 2, 1).showBowl(),
    new PokeBowl("large").ChooseBase("black rice").AddIngredients(1, 1, 2, 1).AddProteins(0, 2, 1).showBowl(),
    new PokeBowl("large").ChooseBase("rice").AddIngredients(1, 2, 5, 1).AddProteins(1, 0, 1).showBowl()
);

// store them in DB
// Store them in DB (Wait for all insertions)
console.log(pokeBowls[0].getProtiens())
console.log("PokeBowls array:", pokeBowls);


(async () => {
    console.log("🟡 Storing PokeBowls in DB sequentially...");
    try {
        for (const pokeBowl of pokeBowls) {
            await addPokeBowl(pokeBowl);  // Ensures one insert finishes before the next starts
        }
        console.log("🟢 All PokeBowls inserted successfully!");
    } catch (error) {
        console.error("🔴 Error inserting PokeBowls:", error.message);
    }
})();
*/

