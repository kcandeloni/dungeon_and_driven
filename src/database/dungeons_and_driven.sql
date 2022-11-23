CREATE DATABASE dungeons_and_driven;

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"description" TEXT DEFAULT '',
	"gold" INTEGER DEFAULT 100,
	"hp" INTEGER DEFAULT 100,
	"xp" INTEGER DEFAULT 0,
	"level" INTEGER DEFAULT 1,
	"autoEquip" BOOLEAN DEFAULT TRUE,
	"active" BOOLEAN DEFAULT TRUE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "dungeons" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"description" TEXT DEFAULT '',
	"level" INTEGER NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "typesEquipament" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "elements" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "equipament" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"description" TEXT,
	"atk" INTEGER NOT NULL,
	"def" INTEGER NOT NULL,
	"price" INTEGER NOT NULL,
	"typeEquipamentId" INTEGER NOT NULL REFERENCES "typesEquipament"("id"),
	"elementId" INTEGER NOT NULL REFERENCES elements("id"),
	"owner" INTEGER REFERENCES users("id"),
	"creatorId" INTEGER NOT NULL REFERENCES users("id"),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_equipament" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL UNIQUE REFERENCES users("id"),
	"helmetId" INTEGER UNIQUE REFERENCES equipament("id"),
	"armorId" INTEGER UNIQUE REFERENCES equipament("id"),
	"rightHandId" INTEGER UNIQUE REFERENCES equipament("id"),
	"leftHandId" INTEGER UNIQUE REFERENCES equipament("id"),
	"amuletId" INTEGER UNIQUE REFERENCES equipament("id"),
	"bootsId" INTEGER UNIQUE REFERENCES equipament("id"),
	"powerAmount" INTEGER NOT NULL DEFAULT 0,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO "users" (name, email, password) VALUES ('Sub-Zero', 'subzero@drivent.com', '$2y$10$r.4Q7csj2n7ZVW0WpGwSSuf6vF1BbOmRmumYCa4ZmZ2e/kwjjXo7u');

INSERT INTO elements (name) VALUES ('Fire');
INSERT INTO elements (name) VALUES ('Ice');
INSERT INTO elements (name) VALUES ('Tech');
INSERT INTO elements (name) VALUES ('Nature');
INSERT INTO elements (name) VALUES ('Darkness');
INSERT INTO elements (name) VALUES ('Holy');

INSERT INTO "typesEquipament" (name) VALUES ('Helmet');
INSERT INTO "typesEquipament" (name) VALUES ('Armor');
INSERT INTO "typesEquipament" (name) VALUES ('Amulet');
INSERT INTO "typesEquipament" (name) VALUES ('Sword');
INSERT INTO "typesEquipament" (name) VALUES ('Shield');
INSERT INTO "typesEquipament" (name) VALUES ('Staff');
INSERT INTO "typesEquipament" (name) VALUES ('Grimoire');
INSERT INTO "typesEquipament" (name) VALUES ('Boots');

INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 1',1);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 2',2);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 3',3);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 4',4);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 5',5);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 6',6);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 7',7);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 8',8);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 9',9);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 10',10);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 11',11);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 12',12);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 13',13);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 14',14);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 15',15);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 16',16);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 17',17);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 18',18);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 19',19);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 20',20);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 21',21);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 22',22);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 23',23);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 24',24);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 25',25);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 26',26);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 27',27);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 28',28);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 29',29);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 30',30);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 31',31);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 32',32);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 33',33);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 34',34);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 35',35);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 36',36);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 37',37);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 38',38);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 39',39);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 40',40);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 41',41);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 42',42);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 43',43);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 44',44);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 45',45);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 46',46);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 47',47);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 48',48);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 49',49);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 50',50);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 51',51);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 52',52);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 53',53);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 54',54);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 55',55);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 56',56);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 57',57);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 58',58);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 59',59);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 60',60);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 61',61);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 62',62);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 63',63);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 64',64);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 65',65);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 66',66);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 67',67);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 68',68);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 69',69);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 70',70);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 71',71);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 72',72);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 73',73);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 74',74);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 75',75);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 76',76);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 77',77);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 78',78);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 79',79);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 80',80);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 81',81);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 82',82);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 83',83);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 84',84);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 85',85);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 86',86);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 87',87);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 88',88);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 89',89);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 90',90);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 91',91);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 92',92);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 93',93);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 94',94);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 95',95);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 96',96);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 97',97);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 98',98);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 99',99);
INSERT INTO dungeons (name, level) VALUES ('Dungeon lvl 100',100);