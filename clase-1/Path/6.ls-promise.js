const fs = require('node:fs/promises');

fs.readdir('./')
.then(fyles =>{
    fyles.forEach(fyle => {
        console.log(fyle);
    });
})
.catch(err => {
    console.error("No se pudo leer el directorio ",err.message);
    return;
})