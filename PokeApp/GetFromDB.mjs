'use strict'
import sqlite3 from 'sqlite3';
import { PokeBowl } from './PokeBowlCreator.mjs'; // Import your PokeBowl function

// Open database connection
const db = new sqlite3.Database('myDB.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    }
});

/**
 * Fetch all PokeBowls from the database
 * @returns {Promise<PokeBowl[]>} - List of PokeBowl objects
 */
export function getAllPokeBowls() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Poke", [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            // Convert rows into PokeBowl objects
            const pokeBowls = rows.map(row => {
                let pokeBowl = new PokeBowl(row.Size);
                    pokeBowl.base = row.Base;
                    pokeBowl.BowlProteins=row.Proteins ? row.Proteins.split(",") : [];
                    pokeBowl.BowlIngredients= row.Ingredients ? row.Ingredients.split(",") : [];

                pokeBowl.id = row.Id; // Assign ID for reference
                return pokeBowl;
            });

            resolve(pokeBowls);
        });
    });
}

/**
 * Fetch a single PokeBowl by ID
 * @param {number} pokeID - The ID of the PokeBowl
 * @returns {Promise<PokeBowl | null>} - PokeBowl object or null if not found
 */
export function getPokeBowlById(pokeID) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Poke WHERE Id = ?", [pokeID], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (!row) {
                resolve(null);
                return;
            }

            let pokeBowl = new PokeBowl(row.Size)
                .ChooseBase(row.Base)
                .AddProteins(...(row.Proteins ? row.Proteins.split(",") : []))
                .AddIngredients(...(row.Ingredients ? row.Ingredients.split(",") : []));

            pokeBowl.id = row.Id;
            resolve(pokeBowl);
        });
    });
}

process.on('SIGINT', () => {
    console.log("🟡 Closing database before exiting...");
    db.close((err) => {
        if (err) {
            console.error("🔴 Error closing DB:", err.message);
        } else {
            console.log("🟢 Database closed. Exiting.");
            process.exit(0);
        }
    });
});
