-- Creating Database : 
CREATE DATABASE authentication ;

-- switching on the authentication database 
\c authentication 

-- Creating table 
CREATE TABLE user_details
(
    id SERIAL PRIMARY KEY ,
    username VARCHAR(50) NOT NULL ,
    password VARCHAR(200) NOT NULL 
)
