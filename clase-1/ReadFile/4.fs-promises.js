// Asincronous reading

// Just in native modules that don't have native promises

// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

// fs.readFilePromise = ...

const fs = require('node:fs/promises');

console.log('Leyendo el primer archivo');
fs.readFile('file1.txt', 'utf8')
  .then(text => {
    console.log('Primer texto:', text);
  });

console.log('---> Haciendo cosas mientras lee el archivo');

console.log('Leyendo el segundo archivo');

fs.readFile('file2.txt', 'utf8')
  .then(text => {
    console.log('Segundo texto:', text);
  });