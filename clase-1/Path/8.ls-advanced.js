const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.';

async function ls () {
    let files
    try {
        files = await fs.readdir(folder)
    } catch{
        console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`))
        process.exit(1);
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);
        let stats
        try {
            stats = await fs.stat(filePath);
        } catch (error) {
            console.log(`No se pudo leer el archivo ${filePath}`);
            process.exit(1);
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'D' : 'F';
        const fileSize = stats.size.toString();
        const fileModified = stats.mtime.toLocaleString();

        return `${pc.bgMagenta(fileType)} ${pc.blueBright(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
    })

    const fileInfo = await  Promise.all(filesPromises);

    fileInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder);