-- Name, SKU, Price, Description
-- SKU cannot be duplicate, Description can be null
--@block
CREATE TABLE product(
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    description TEXT
);

--@block
INSERT INTO product(name, sku, price, description) VALUES('Product 1', 'SKU1', 100, 'Description 1');

-- delete table product
--@block
DROP TABLE product;