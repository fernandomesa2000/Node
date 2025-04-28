// Asynchronous reading - CALLBACK

const fs = require('node:fs');

console.log('Leyendo el primer archivo');
fs.readFile('file1.txt', 'utf8', (err, text)=>{ //Executing callback
    console.log(text);
});

console.log('---> Haciendo cosas mientras lee el archivo');

console.log('Leyendo el segundo archivo');
fs.readFile('file2.txt', 'utf8', (err, text)=>{ //Executing callback
    console.log(text);
});