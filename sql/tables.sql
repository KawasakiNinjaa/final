DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(255) not null,
    last VARCHAR(255) not null,
    email VARCHAR (255) not null unique,
    password VARCHAR (255) not null,
    img_url VARCHAR (300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
