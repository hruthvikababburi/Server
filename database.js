const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./databases/todos.db',(err)=>{
    if (err){
        console.error(`Error while opening database ${err.message}`)
    }
    else{
        db.run(`CREATE TABLE IF NOT EXISTS users(
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            password TEXT
            )`);
        db.run(`CREATE TABLE IF NOT EXISTS tasks(
            id TEXT PRIMARY KEY,
            userId TEXT,
            description TEXT,
            status TEXT,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
            )`);    
    }
})

module.exports = db