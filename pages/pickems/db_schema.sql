-- SQL Schema for League of Legends Tournament Pickems Website

-- Teams Table
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL
);

-- Matches Table
CREATE TABLE matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team1Id INT,
    team2Id INT,
    date DATETIME NOT NULL,
    stage VARCHAR(50) NOT NULL,
    FOREIGN KEY (team1Id) REFERENCES teams(id),
    FOREIGN KEY (team2Id) REFERENCES teams(id)
);

-- Users Table (Assuming there will be user accounts for pickems)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Consider hashing passwords
);

-- Pickems Table (To store user predictions)
CREATE TABLE pickems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    matchId INT,
    pickedTeamId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (matchId) REFERENCES matches(id),
    FOREIGN KEY (pickedTeamId) REFERENCES teams(id)
);
