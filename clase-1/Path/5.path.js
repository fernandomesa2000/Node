const path = require('node:path');

//Separating bar according to OS
console.log(path.sep)

//Join paths
const filePath = path.join('content','subfolder','test.txt');
console.log(filePath);

//filename
const base = path.basename('content/subfolder/test.txt');
console.log(base);

//filename, delete extension
const fileName = path.basename('content/subfolder/test.txt','.txt');
console.log(fileName);

//file Extension
const extension = path.extname('file.a.b.c.aaaa..abc.txt');
console.log(extension);