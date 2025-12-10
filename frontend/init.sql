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
    icon VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    fun_fact TEXT,
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
    puzzle_text TEXT,
    correct_answer TEXT,
    order_number INT NOT NULL,
    clue_text TEXT,
    correct_clue_location INT,
    puzzle_type VARCHAR(50),
    FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (correct_clue_location) REFERENCES locations(id) ON DELETE CASCADE
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

INSERT INTO cities (name, description, latitude, longitude, icon, slug) VALUES
('Göteborg', 'En historisk stad vid västkusten i Sverige', 57.7089, 11.9746, 'gothenburg.png', 'gothenburg'),
('Prag', 'Böhmens gamla huvudstad vars mysterier väntar på att upptäckas', 50.0755, 14.4378, 'prague.png', 'prague'),
('Rom', 'Den eviga staden erbjuder gåtor och historia i överflöd', 41.9028, 12.4964, 'rome.png', 'rome');



INSERT INTO locations (name, description, fun_fact, city_id, latitude, longitude) VALUES
('Feskekôrka', 'Känd fiskmarknad och byggnad', 'Byggnaden ser ut som en kyrka men säljer fisk sedan 1874.', 1, 57.7078, 11.9661),
('Skansen Kronan', 'Historiskt försvarstorn', 'Tornet byggdes 1687 och var en del av stadens försvar.', 1, 57.7085, 11.9520),
('Göteborgs Konstmuseum', 'Museum med nordisk konst', 'Huset öppnade 1923 och rymmer över 7000 konstverk.', 1, 57.6946, 11.9741),
('Haga Nygata', 'Charmig gata med kaféer och butiker', 'Haga är en av Göteborgs äldsta stadsdelar med kullerstensgator och små kaféer.', 1, 57.6964, 11.9670);


INSERT INTO quests (name, description, city_id) VALUES
('Göteborgs Äventyr', 'Utforska Göteborg genom 4 historiska platser', 1),
('Prags Mysterier', 'Upptäck Prags historiska platser och hemligheter', 2),
('Roms Gåtor', 'Följ ledtrådar genom Roms antika och moderna sevärdheter', 3);

INSERT INTO puzzles
(quest_id, location_id, puzzle_text, correct_answer, order_number, clue_text, correct_clue_location, puzzle_type)
VALUES
(1, 1, 'Vilken fisk konsumeras mest i Göteborg', 'Torsk', 1, 'Börja vid där fisken en gång kom in till staden', 1, 'text'),
(1, 2, 'Vilken är Göteborgs högst punkt?', 'Vättlefjäll', 2, 'Klättra upp till det gamla tornet', 2, 'text'),
(1, 3, 'Vilken känd Göteborgs konsnär som finns utställd på museet författade barnboken "Kattresan"?', 'Ivar Arosenius', 3, 'Sök efter konst', 3, 'text'),
(1, 4, 'Vad kallas de för Göteborg karaktäristiska byggnader som är vanliga på denna gata?', 'Landshövdingshus', 4, 'Promenera längs gatan som är känd för sina kanelbullar', 4, 'text');


-- INSERT INTO users (name, email) VALUES
-- ('Rasmus', 'rasmus@gmail.com');

-- INSERT INTO user_progress (user_id, quest_id, puzzle_id) VALUES
-- (1, 1, 1);

SELECT * FROM cities;
