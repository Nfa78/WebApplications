import sqlite3 from 'sqlite3';

// Open database connection
const db = new sqlite3.Database('myDB.db', (err) => {
    if (err) {
        console.error("🔴 Database connection error:", err.message);
    }
});

/**
 * Deletes ALL entries from both Poke and Orders tables.
 * @returns {Promise<void>}
 */
export function deleteAllData() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("DELETE FROM Orders", function (err) {
                if (err) {
                    console.error("🔴 Error deleting all Orders:", err.message);
                    reject(err);
                    return;
                }
                console.log("🟢 All Orders deleted.");
            });

            db.run("DELETE FROM Poke", function (err) {
                if (err) {
                    console.error("🔴 Error deleting all PokeBowls:", err.message);
                    reject(err);
                    return;
                }
                console.log("🟢 All PokeBowls deleted.");
                resolve();
            });
        });
    });
}

/**
 * Deletes a PokeBowl by ID.
 * @param {number} id - The ID of the PokeBowl to delete.
 * @returns {Promise<void>}
 */
export function deletePokeById(id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Poke WHERE Id = ?", [id], function (err) {
            if (err) {
                console.error(`🔴 Error deleting PokeBowl with ID ${id}:`, err.message);
                reject(err);
                return;
            }
            console.log(`🟢 PokeBowl with ID ${id} deleted.`);
            resolve();
        });
    });
}

/**
 * Deletes an Order by ID.
 * @param {number} id - The ID of the Order to delete.
 * @returns {Promise<void>}
 */
export function deleteOrderById(id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Orders WHERE OrderID = ?", [id], function (err) {
            if (err) {
                console.error(`🔴 Error deleting Order with ID ${id}:`, err.message);
                reject(err);
                return;
            }
            console.log(`🟢 Order with ID ${id} deleted.`);
            resolve();
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
