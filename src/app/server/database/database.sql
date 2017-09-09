
CREATE DATABASE test;
USE test;

CREATE TABLE Note(
  noteId INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160),
  content LONGTEXT,
  created DATE,
  updated DATE,
  notebookId INTEGER REFERENCES Notebook(notebookId)
);

CREATE TABLE Notebook(
  notebookId INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120)
);

CREATE TABLE Tag(
  tagId INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120)
);

CREATE TABLE NoteTag(
  noteId INTEGER REFERENCES Note(noteId),
  tagID INTEGER REFERENCES Tag(tagId)
);


INSERT INTO Tag(name) VALUES ('Todo'), ('Done'), ('Doing');
INSERT INTO Tag(name) VALUES ('Inbox'), ('Actionable');


INSERT INTO Notebook(name) VALUES ('Inbox'), ('Actionable');

INSERT INTO Note(title, content, notebookId)
VALUES
  ('Title 1', 'Hello World!!!', 0),
  ('Title 2', 'Hello World!!!', 0),
  ('Do task A', 'Do the task A', 0);

INSERT INTO Note(title, content, notebookId) VALUES ('Task A', 'Create project', 2);


INSERT INTO NoteTag(noteId, tagId) VALUES (3, 1);
INSERT INTO NoteTag(noteId, tagId) VALUES (1, 4), (2, 4);


--- SELECT

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID=Customers.CustomerID;

SELECT *
FROM Note
INNER JOIN NoteTag
ON NoteTag.noteI=Note.noteId
WHERE NoteTag.tagId=4;

SELECT Notebook.name, COUNT(*) AS 'number'
FROM Note
INNER JOIN Notebook
ON Note.notebookId=Notebook.notebookId;


SELECT Notebook.name, COUNT(*) AS 'number'
FROM Note
INNER JOIN Notebook
ON Note.notebookId=Notebook.notebookId
GROUP BY Note.notebookId;


SELECT Notebook.name, COUNT(*) AS 'number'
FROM Note
INNER JOIN Notebook
ON Note.notebookId=Notebook.notebookId
GROUP BY Note.notebookId;


--- Notebook with number of notes
SELECT Notebook.name, COUNT(Note.notebookId) AS 'number'
FROM Notebook
LEFT JOIN Note
ON Notebook.notebookId=Note.notebookId
GROUP BY Note.notebookId;

SELECT Notebook.notebookId, Notebook.name, COUNT(Note.notebookId) AS 'number' FROM Notebook LEFT JOIN Note ON Notebook.notebookId=Note.notebookId GROUP BY Note.notebookId;

--- Total of notes
SELECT COUNT(*) AS 'total' FROM Note;
GROUP BY Tag.tagId;

--- Total number of each tag
SELECT Tag.name, COUNT(NoteTag.tagId) AS 'number'
FROM Tag
LEFT JOIN
NoteTag ON Tag.tagId=NoteTag.tagId
GROUP BY Tag.tagId;


SELECT * FROM Note GROUP BY notebookId;

UPDATE Note SET notebookId=1




INSERT INTO ClientesCidades (NomeCliente, CidadeCliente, CredCliente) SELECT cc_nome, cc_cidade, cc_cred FROM CliCred;


INSERT INTO Note(title, content, created, updated, notebookId) SELECT title, content, created, updated, idNotebook FROM Notes;
