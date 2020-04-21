BEGIN;
ALTER SEQUENCE animals_id_seq RESTART; 
--this resets primary key to 1
INSERT INTO animals
    (imageurl)
VALUES
    ('https://imgur.com/a/FoQS62U'),
    ('https://imgur.com/a/Lqjz6fv'),
    ('https://imgur.com/a/DVEwqqG'),
    ('https://imgur.com/a/nQQxTP5'),
    ('https://imgur.com/a/kUNspMz'),
    ('https://imgur.com/a/AWYlaPk'),
    ('https://imgur.com/a/Ue2oSkr'),
    ('https://imgur.com/a/GrCzRVv');


INSERT INTO names
    (nameText, votes, animalsId)
VALUES
    ('Bob', 5, 1),
    ('Robert', 8, 1),
    ('Phred', 3, 2),
    ('Caroline', 5, 3),
    ('Sarah', 5, 4),
    ('Becca', 5, 5),
    ('Al', 5, 6),
    ('Judi', 5, 7),
    ('Ann', 5, 8);

COMMIT;