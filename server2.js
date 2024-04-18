const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_users'
});


app.use(cors());
app.use(express.json());

connection.connect(function (err) {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ' + err.stack);
        return;
    }
    console.log('Działa id: ' + connection.threadId);
});

// http://localhost:4000/users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', function (err, results, fields) {
        if (err) {
            console.error('Błąd zapytania SQL: ' + err.stack);
            return res.status(500).send('Błąd zapytania SQL');
        }
        console.log('Wyniki zapytania:', results);
        res.send(results);
    });
});

app.get('/search', (req, res) => {
    const { name, password } = req.query;
    const sql = 'SELECT * FROM users WHERE Name = ? AND Password = ?';
    connection.query(sql, [name, password], (err, results, fields) => {
        if (err) {
            console.error('Błąd wyszukiwania użytkownika:', err);
            return res.status(500).send('Błąd wyszukiwania użytkownika');
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);
        } else {
            res.status(404).send('Nie ma takiego użytkownika');
        }
    });
});



app.get('/tasks', (req, res) => {
    const { name, password, id } = req.query;
    console.log(name, password, id);
    const sql = 'SELECT users.Name, tasks.tytul, tasks.opis, tasks.date FROM users INNER JOIN tasks ON users.id = tasks.id WHERE users.Name = ?';
    connection.query(sql, [name], (err, results, fields) => {
        if (err) {
            console.error('Błąd wyszukiwania użytkownika:', err);
            return res.status(500).send('Błąd wyszukiwania użytkownika');
        }
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(404).send('Nie ma takiego użytkownika');
        }
    });
});




app.post('/add', (req, res) => {
    const { Name, Password } = req.body;
    console.log(req.body);
    const sql = 'INSERT INTO users (Name, Password) VALUES (?, ?)';
    connection.query(sql, [Name, Password], (err, result) => {
      if (err) {
        console.error('Błąd dodawania użytkownika:', err);
        return res.status(500).send('Błąd dodawania użytkownika');
      }
      console.log('Dodano nowego użytkownika:', Name); 
      res.status(200).send('Użytkownik został dodany pomyślnie');
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Błąd usuwania użytkownika:', err);
            return res.status(500).send('Błąd usuwania użytkownika');
        }
        console.log('Usunięto użytkownika o id:', userId);
        res.status(200).send('Użytkownik został usunięty pomyślnie');
    });
});



  





app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});

process.on('SIGINT', () => {
    connection.end(function (err) {
        if (err) {
            console.error('Błąd');
            return;
        }
        console.log('Zakończono');
        process.exit();
    });
});
