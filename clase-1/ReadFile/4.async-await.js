// Sequential Asincronous reading
const { readFile } = require ('node:fs/promises');

// IIFE - Inmediately Inkoked Function Expression
(
    async function init(){
        console.log('Leyendo el primer archivo');
        const text = await readFile('file1.txt', 'utf8');
        console.log('Primer texto:', text);
        console.log('---> Haciendo cosas mientras lee el archivo');

        console.log('Leyendo el segundo archivo');
        const text2 = await readFile('file2.txt', 'utf8');
        console.log('Primer texto:', text2);
    }
)();
