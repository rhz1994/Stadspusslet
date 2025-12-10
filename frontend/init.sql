CREATE DATABASE IF NOT EXISTS stadspusslet;

DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS puzzles;
DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS users;

USE stadspusslet;

CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    icon VARCHAR(100) NOT NULL
);

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    city_id INT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE TABLE quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE TABLE puzzles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT NOT NULL,
    location_id INT NOT NULL,
    order_number INT NOT NULL,
    clue_text TEXT,
    puzzle_type VARCHAR(50),
    FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE user_progress (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     quest_id INT NOT NULL,
--     puzzle_id INT NOT NULL,
--     solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE,
--     FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
-- );

INSERT INTO cities (name, description, latitude, longitude, icon) VALUES
('Göteborg', 'En historisk stad vid västkusten i Sverige', 57.7089, 11.9746, 'gothenburg.png'),
('Prag', 'Böhmens gamla huvudstad vars mysterier väntar på att upptäckas', 50.0755, 14.4378, 'prague.png'),
('Rom', 'Den eviga staden erbjuder gåtor och historia i överflöd', 41.9028, 12.4964, 'rome.png');


INSERT INTO locations (name, description, city_id, latitude, longitude) VALUES
('Feskekôrka', 'Känd fiskmarknad och byggnad', 1, 57.7078, 11.9661),
('Skansen Kronan', 'Historiskt försvarstorn på Hisingen', 1, 57.7085, 11.9520),
('Göteborgs Konstmuseum', 'Museum med nordisk konst', 1, 57.6946, 11.9741),
('Haga Nygata', 'Charmig gata med kaféer och butiker', 1, 57.6964, 11.9670);

INSERT INTO quests (name, description, city_id) VALUES
('Göteborgs Äventyr', 'Utforska Göteborg genom 4 historiska platser', 1);

INSERT INTO puzzles (quest_id, location_id, order_number, clue_text, puzzle_type) VALUES
(1, 1, 1, 'Börja vid fisken som aldrig stänger', 'text'),
(1, 2, 2, 'Klättra upp till tornet och blicka ut över staden', 'text'),
(1, 3, 3, 'Sök efter konst som speglar Norden', 'text'),
(1, 4, 4, 'Promenera längs gatan med små butiker och kaféer', 'text');

-- INSERT INTO users (name, email) VALUES
-- ('Rasmus', 'rasmus@gmail.com');

-- INSERT INTO user_progress (user_id, quest_id, puzzle_id) VALUES
-- (1, 1, 1);
