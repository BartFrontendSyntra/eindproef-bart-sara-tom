
-- ============================================
-- SEED DATA - Example Data for Belgium
-- ============================================

-- Insert Roles
INSERT INTO roles (role_name) VALUES 
('Admin'),
('Ranger'),
('Visitor');

-- Insert Users (password_hash is a bcrypt hash of 'password123' for demo purposes)
INSERT INTO users (username, email, password_hash, role_id) VALUES 
('Jan Vermeulen', 'jan.vermeulen@forestmaster.be', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 1),
('Sophie De Vries', 'sophie.devries@forestmaster.be', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 2),
('Pieter Jacobs', 'pieter.jacobs@gmail.com', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 2),
('Marie Claessens', 'marie.claessens@outlook.com', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 3),
('Luc Wouters', 'luc.wouters@gmail.com', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 3),
('Emma Peeters', 'emma.peeters@hotmail.com', '$2b$10$rKZY0ZqJ9fVL4Q3YqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 3);

-- Insert Location Types
INSERT INTO location_types (type_name) VALUES 
('Nationaal Park'),
('Natuurreservaat'),
('Gemeentelijk Bos'),
('Privé Bos'),
('Beschermd Landschap'),
('Stadsbos');

-- Insert Locations (Belgian forests and parks)
INSERT INTO locations (name, location_type_id) VALUES 
('Nationaal Park Hoge Kempen', 1),
('Zoniënwoud', 2),
('Hallerbos', 2),
('Sonian Forest', 2),
('Meerdaalwoud', 3),
('Kalmthoutse Heide', 1),
('Antwerps Groendomein Rivierenhof', 6),
('Bourgoyen-Ossemeersen', 2),
('Het Leen', 3),
('Bos van Heverlee', 3),
('Mechelse Heide', 2),
('De Wijers', 2),
('Torfbroek', 2),
('Grotenbergbos', 3),
('Bulskampveld', 2);

-- Insert Observations with Belgian coordinates and Dutch descriptions
-- Coordinates are in POINT(longitude, latitude) format for Belgian locations

INSERT INTO observations (user_id, coordinates, observation_text, photo_url, status, created_at) VALUES 
(
    2, 
    ST_GeomFromText('POINT(5.7833 50.9667)', 4326),
    'Gezonde populatie van wilde zwijnen waargenomen in de buurt van het wandelpad. Sporen en wroetgaten aanwezig in de buurt van de eikenbomen.',
    'https://example.com/photos/wilde-zwijnen-1.jpg',
    'verified',
    '2025-12-15 09:30:00'
),
(
    3,
    ST_GeomFromText('POINT(4.4106 50.7636)', 4326),
    'Prachtige blauwklokjes in bloei! De hele bosbodem staat blauw. Perfecte tijd voor een bezoek aan het Hallerbos.',
    'https://example.com/photos/hallerbos-blauwklokjes.jpg',
    'verified',
    '2025-04-18 14:20:00'
),
(
    4,
    ST_GeomFromText('POINT(5.6833 50.9500)', 4326),
    'Waarneming van een vos bij het Pietersheimer. Het dier leek gezond en was niet schuw.',
    'https://example.com/photos/vos-hoge-kempen.jpg',
    'verified',
    '2025-12-20 07:45:00'
),
(
    5,
    ST_GeomFromText('POINT(4.3572 50.8503)', 4326),
    'Omgevallen boom blokkeert het hoofdwandelpad. Mogelijk storm schade van afgelopen weekend.',
    'https://example.com/photos/omgevallen-boom-zonienwoud.jpg',
    'pending',
    '2026-01-03 11:15:00'
),
(
    6,
    ST_GeomFromText('POINT(4.6394 51.0297)', 4326),
    'Grote groep kraaien verzameld in de buurt van de vijver. Mogelijk voedselplaats.',
    NULL,
    'verified',
    '2025-12-28 16:30:00'
),
(
    2,
    ST_GeomFromText('POINT(5.1242 51.0881)', 4326),
    'Reeën gespot in de vroege ochtend. Familie van 4 dieren, waaronder 2 kalveren.',
    'https://example.com/photos/reeen-mechelse-heide.jpg',
    'verified',
    '2025-11-10 06:20:00'
),
(
    3,
    ST_GeomFromText('POINT(4.3572 50.8503)', 4326),
    'Specht gehoord en gezien bij de oude eik. Zwarte specht waarschijnlijk.',
    'https://example.com/photos/specht-zonienwoud.jpg',
    'verified',
    '2025-12-05 10:00:00'
),
(
    4,
    ST_GeomFromText('POINT(4.6800 50.8600)', 4326),
    'Illegale dumpsite ontdekt. Huishoudelijk afval en bouwmateriaal. Dringend opruimen vereist.',
    'https://example.com/photos/afval-meerdaalwoud.jpg',
    'flagged',
    '2026-01-02 13:45:00'
),
(
    5,
    ST_GeomFromText('POINT(4.4106 50.7636)', 4326),
    'Paddenstoelen verzameling gespot langs het pad. Mogelijk giftige soorten - waarschuwingsbord aanbevolen.',
    'https://example.com/photos/paddenstoelen-hallerbos.jpg',
    'pending',
    '2025-10-22 15:10:00'
),
(
    6,
    ST_GeomFromText('POINT(5.7833 50.9667)', 4326),
    'Nieuwe bijenhotels geïnstalleerd bij de ingang. Goede initiatieven voor biodiversiteit!',
    'https://example.com/photos/bijenhotel-hoge-kempen.jpg',
    'verified',
    '2025-09-14 12:00:00'
),
(
    2,
    ST_GeomFromText('POINT(4.4283 51.3714)', 4326),
    'Zeldzame orchideeën aangetroffen in het natuurreservaat. Mogelijk beschermde soort.',
    'https://example.com/photos/orchidee-kalmthout.jpg',
    'verified',
    '2025-06-08 08:30:00'
),
(
    3,
    ST_GeomFromText('POINT(3.7350 51.0464)', 4326),
    'Wateroverlast op het wandelpad door recente regenval. Laarzen aanbevolen.',
    NULL,
    'pending',
    '2026-01-04 09:00:00'
),
(
    4,
    ST_GeomFromText('POINT(5.0600 50.9300)', 4326),
    'Mooie herfstbladeren in De Wijers. Perfect voor natuurfotografie.',
    'https://example.com/photos/herfst-de-wijers.jpg',
    'verified',
    '2025-10-30 14:45:00'
),
(
    5,
    ST_GeomFromText('POINT(4.4106 50.7636)', 4326),
    'Jonge eekhoorn gezien die voedsel verzamelt voor de winter. Erg actief dier!',
    'https://example.com/photos/eekhoorn-hallerbos.jpg',
    'verified',
    '2025-11-25 11:20:00'
),
(
    6,
    ST_GeomFromText('POINT(4.6394 51.0297)', 4326),
    'Nieuw informatiebord geplaatst met wandelroutes en veiligheidsregels.',
    'https://example.com/photos/infobord-meerdaalwoud.jpg',
    'verified',
    '2025-08-20 10:30:00'
),
(
    2,
    ST_GeomFromText('POINT(5.7833 50.9667)', 4326),
    'Beschadigde bankje langs het pad. Reparatie nodig voor veiligheid bezoekers.',
    'https://example.com/photos/bankje-schade.jpg',
    'pending',
    '2026-01-05 15:00:00'
),
(
    3,
    ST_GeomFromText('POINT(4.3572 50.8503)', 4326),
    'Schitterende zonsopgang gefotografeerd tussen de bomen. Magisch moment!',
    'https://example.com/photos/zonsopgang-zonienwoud.jpg',
    'verified',
    '2025-07-12 05:45:00'
),
(
    4,
    ST_GeomFromText('POINT(5.1242 51.0881)', 4326),
    'Mountainbikers rijden off-trail en veroorzaken erosie. Mogelijk strengere controle nodig.',
    NULL,
    'flagged',
    '2026-01-01 12:30:00'
),
(
    5,
    ST_GeomFromText('POINT(4.4283 51.3714)', 4326),
    'Zeldzame vlinders waargenomen in het heidelandschap. Prachtige biodiversiteit!',
    'https://example.com/photos/vlinders-kalmthout.jpg',
    'verified',
    '2025-07-25 13:15:00'
),
(
    6,
    ST_GeomFromText('POINT(3.7350 51.0464)', 4326),
    'Vogelkijkhut gerenoveerd. Uitstekende plek voor vogel observatie nu.',
    'https://example.com/photos/vogelkijkhut-bourgoyen.jpg',
    'verified',
    '2025-09-05 16:00:00'
);