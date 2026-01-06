-- 1. Roles: Define access levels (Admin, Ranger, Visitor)
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users: Basic profile info
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT username_no_spaces CHECK (username NOT REGEXP '[[:space:]]')
);

-- 3. Location Types: Categorize areas (Nationaal Park, Privé bos, etc.)
CREATE TABLE location_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

-- 4. Locations: The actual geographical boundaries or points
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_type_id INT,
    FOREIGN KEY (location_type_id) REFERENCES location_types(id)
);

-- 5. Observations: The data gathered by users
CREATE TABLE observations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    coordinates POINT SRID 4326 NOT NULL, -- Precise GPS of the observation
    observation_text TEXT,
    photo_url VARCHAR(512),
    status ENUM('pending', 'verified', 'flagged') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    SPATIAL INDEX(coordinates),
    FOREIGN KEY (user_id) REFERENCES users(id)
);