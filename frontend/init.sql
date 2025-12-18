CREATE DATABASE IF NOT EXISTS stadspusslet;

DROP TABLE IF EXISTS puzzles;
DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS puzzles;

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



INSERT INTO cities (name, description, latitude, longitude, icon, slug) VALUES
('Göteborg', 'En historisk stad vid västkusten i Sverige', 57.7089, 11.9746, 'gothenburg.png', 'gothenburg'),
('Prag', 'Böhmens gamla huvudstad vars mysterier väntar på att upptäckas', 50.0755, 14.4378, 'prague.png', 'prague'),
('Rom', 'Den eviga staden erbjuder gåtor och historia i överflöd', 41.9028, 12.4964, 'rome.png', 'rome');



INSERT INTO locations (name, description, fun_fact, city_id, latitude, longitude) VALUES
('Feskekôrka', 'Känd fiskmarknad och byggnad', 'Byggnaden ser ut som en kyrka men säljer fisk sedan 1874.', 1, 57.701082128139156, 11.957830489016008),
('Skansen Kronan', 'Historiskt försvarstorn', 'Tornet byggdes 1687 och var en del av stadens försvar.', 1, 57.696049311183074, 11.955352292114789),
('Göteborgs Konstmuseum', 'Museum med nordisk konst', 'Huset öppnade 1923 och rymmer över 7000 konstverk.', 1, 57.69652103459663, 11.980597654028193),
('Haga Nygata', 'Charmig gata med kaféer och butiker', 'Haga är en av Göteborgs äldsta stadsdelar med kullerstensgator och små kaféer.', 1, 57.698487926150264, 11.957021989858973);


INSERT INTO quests (name, description, city_id) VALUES
('Göteborgs Äventyr', 'Utforska Göteborg genom 4 historiska platser', 1),
('Den försvunna skatten', 'Leta efter en bortglömd skatt i Götborg', 1),
('Prags Mysterier', 'Upptäck Prags historiska platser och hemligheter', 2),
('Roms Gåtor', 'Följ ledtrådar genom Roms antika och moderna sevärdheter', 3);

INSERT INTO puzzles
(quest_id, location_id, puzzle_text, correct_answer, order_number, clue_text, correct_clue_location, puzzle_type)
VALUES
(1, 1, 'Vad heter arktitekten som ritade Fiskekyrkan, såväl som många andra ikoniniska Göteborgs monument?', 'Victor Von Gegerfelt', 1, 'Börja där fisken en gång kom in till staden', 1, 'text'),
(1, 2, 'Vilken är Göteborgs högst punkt?', 'Vättlefjäll', 2, 'Klättra upp till det gamla stentornet', 2, 'text'),
(1, 3, 'Vilken känd Göteborgs konsnär som finns utställd på museet författade barnboken "Kattresan"?', 'Ivar Arosenius', 3, 'Sök efter konstens hemvist', 3, 'text'),
(1, 4, 'Vad kallas de för Göteborg karaktäristiska byggnader som är vanliga på denna gata?', 'Landshövdingshus', 4, 'Promenera längs gatan som är känd för sina kanelbullar', 4, 'text');


SELECT * FROM cities;
