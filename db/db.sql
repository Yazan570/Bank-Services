
use services;
create table catalog(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
 