import sqlite from "sqlite3"


export function db()
{
    return new sqlite.Database("src/database/db.sqlite", (err) => { if(err) throw err;})
}

export function initDatabase()
{
    const dbPointer = db();
    dbPointer.run(
        `
            CREATE TABLE User(
               id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
               name VARCHAR(100) NOT NULL 
            );
        `,
        (error) => {if(error) throw error}
    )
    dbPointer.run(
        `
             CREATE TABLE Establishment(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL,
                phone_number VARCHAR(100) NOT NULL,
                food_category VARCHAR(100) NOT NULL,
                type VARCHAR(100) NOT NULL CHECK( type IN ('store','restaurant') )
             
            );
        `,
        (error) => {if(error) throw error}
    )
    dbPointer.run(
        `
             CREATE TABLE Bag(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                type VARCHAR(100) NOT NULL CHECK( type IN ('surprise','regular') ),
                price FLOAT NOT NULL,
                size VARCHAR(100) NOT NULL CHECK( size IN ('small','medium','large') ),
                status VARCHAR(100) NOT NULL CHECK( size IN ('available','reserved') ),
                start_date TIMESTAMP NOT NULL,
                end_date TIMESTAMP NOT NULL,
                establishment_id INTEGER NOT NULL,

                FOREIGN KEY(establishment_id) REFERENCES Establishment(id)

            );
        `,
        (error) => {if(error) throw error}
    )

    dbPointer.run(
        `
             CREATE TABLE Food(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                quantity INTEGER,
                bag_id INTEGER,

                FOREIGN KEY(bag_id) REFERENCES Bag(id)  

            );
        `,
        (error) => {if(error) throw error}
    )
    dbPointer.run(
        `
             CREATE TABLE Reservation(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                status CHECK( status IN ('cancelled','active','confirmed') ),
                FOREIGN KEY(user_id) REFERENCES User(id)
            );
        `,
        (error) => {if(error) throw error}
    )


    dbPointer.run(
        `
             CREATE TABLE ShoppingCart(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                bag_id INTEGER NOT NULL,
                reservation_id INTEGER NOT NULL,
                allergies VARCHAR(255) NULL,
                special_requests VARCHAR(255) NULL,

                FOREIGN KEY(reservation_id) REFERENCES Reservation(id),
                FOREIGN KEY(bag_id) REFERENCES Bag(id)
            );
        `,
        (error) => {if(error) throw error}
    )
}




