const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'test' 
});

connection.connect(function(err) {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ' + err.stack);
        return;
    }
    console.log('Działa id: ' + connection.threadId);
});




// const newUser = { Name: 'Szymon', Passwrod: 'Szymon4' };
// connection.query('INSERT INTO test2 SET ?', newUser, function(err, results, fields) {
//     if (err) {
//         console.error('Błąd');
//         return;
//     }
//     console.log('Added:', results.insertId);
// });




// const userIdToDelete = 4;

// connection.query('DELETE FROM test2 WHERE id > ?', userIdToDelete, function(err, results, fields) {
//     if (err) {
//         console.error('Błąd podczas usuwania użytkownika: ' + err.stack);
//         return;
//     }
//     console.log('Użytkownik o ID', userIdToDelete, 'został pomyślnie usunięty.');
// });





connection.query('SELECT * FROM test2', function(err, results, fields) {
    if (err) {
        console.error('Błąd zapytania SQL: ' + err.stack);
        return;
    }
    console.log('Wyniki zapytania:', results);
});


connection.end(function(err) {
    if (err) {
        console.error('Błąd: ' + err.stack);
        return;
    }
    console.log('koniec połączenia');
});

