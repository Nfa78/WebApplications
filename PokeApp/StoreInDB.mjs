import sqlite3 from 'sqlite3';

// Open database connection
const db = new sqlite3.Database('myDB.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    }
});

/**
 * Adds a new PokeBowl to the database
 * @param {PokeBowl} pokeBowl - A PokeBowl object
 * @returns {Promise<number>} - The ID of the inserted PokeBowl
 */
export function addPokeBowl(pokeBowl) {
    return new Promise((resolve, reject) => {
        if (!pokeBowl || typeof pokeBowl.getSize !== "function") {
            console.error("🔴 Invalid PokeBowl object:", pokeBowl);
            reject(new Error("Invalid PokeBowl object"));
            return;
        }

        const size = pokeBowl.getSize();
        const base = pokeBowl.getBase();
        const proteins = pokeBowl.getProtiens()?.join(",") || "";
        const ingredients = pokeBowl.getIngredients()?.join(",") || "";

        console.log("🟡 About to insert ->", { size, base, proteins, ingredients });

        db.run(
            `INSERT INTO Poke (Size, Base, Proteins, Ingredients) VALUES (?, ?, ?, ?)`,
            [size, base, proteins, ingredients],
            function (err) {
                if (err) {
                    console.error("🔴 SQLite Insert Error:", err.message);
                    reject(err);
                    return;
                }
                console.log(`🟢 Inserted PokeBowl with ID: ${this.lastID} for size=${size}, base=${base}`);
                resolve(this.lastID);
            }
        );
        
    });
}


// Close the database connection when the process exits
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
