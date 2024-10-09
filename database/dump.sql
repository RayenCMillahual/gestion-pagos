-- dump.sql

-- Habilitar el soporte de claves foráneas
PRAGMA foreign_keys=ON;

-- Crear tabla Users
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')) -- Limita los roles
);

-- Crear tabla Payments
CREATE TABLE Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    userId INTEGER NOT NULL,
    receipt TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE -- Relación con Users
);

-- Inserción de datos de prueba en Users
INSERT INTO Users (username, password, role) VALUES ('admin', 'hashedpassword1', 'admin');
INSERT INTO Users (username, password, role) VALUES ('user1', 'hashedpassword2', 'user');
INSERT INTO Users (username, password, role) VALUES ('user2', 'hashedpassword3', 'user');

-- Inserción de datos de prueba en Payments
INSERT INTO Payments (amount, userId, receipt) VALUES (100.00, 1, 'uploads/receipt1.pdf');
INSERT INTO Payments (amount, userId, receipt) VALUES (200.50, 2, 'uploads/receipt2.pdf');
