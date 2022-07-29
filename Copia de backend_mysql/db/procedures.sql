USE company;

DELIMITER $$
USE `test_urucortinas`$$

CREATE PROCEDURE `categoryAddOrEdit`
(
  IN _id INT,
  IN _name VARCHAR
(255),
  IN _image_url VARCHAR
(255),
)
BEGIN
  IF _id = 0 THEN
  INSERT INTO category
    (name, image_url)
  VALUES
    (_name, _image_url);

  SET _id
  = LAST_INSERT_ID
  ();
ELSE
UPDATE category
    SET
    name = _name,
    salary = _image_url
    WHERE id = _id;
END
IF;

  SELECT _id AS 'id';
END
