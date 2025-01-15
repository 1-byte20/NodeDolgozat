import sqlite from 'sqlite3'

const db = new sqlite.Database('./data/database.sqlite')

async function initialize(){
    await dbRun("DROP TABLE IF EXISTS products")
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, brand STRING, description STRING, price INTEGER)")

    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Start Wars Millennium Falcon", "Lego", "LEGO - for adults, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks", 23760)')
    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Monopoly", "Hasbro", "Recomended from the age of 10 up to 90", 16790)')
    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Uno", "Mattel", "Recomended from the age of 6 for 70+", 3190)')
    await dbRun('INSERT INTO products (name, brand, description, price) VALUES ("Stitch", "Disney", "Intergalactical criminal and maniac in a little blue and purple body", 20690)')

}

function dbRun(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, function (err){
            if (err){
                reject(err)
            } else {
                resolve(this)
            }
        })
    })
}

function dbGet(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, (err, rows) =>{
            if (err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

function dbAll(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, (err, rows) =>{
            if (err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

export {db, dbRun, dbGet, dbAll, initialize}