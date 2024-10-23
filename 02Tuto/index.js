const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);

        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data);
        
        
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n Appended this sentence to promiseWrite file');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseModified.txt'));
        const newData = fsPromises.readFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'utf8');
        console.log(newData);
    } catch(err) {
        console.log(err);
    }
}


fileOps();
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// // A much beta approach is to use 'path' rather than './files/starter.txt' to avoid errors
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);

//     // This File Operation creates a new file with it's content
//     fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'I Love u Papi!!!', (err) => {
//         if (err) throw err;
//         console.log('Write Complete!!!');

//                 // This operation modifies or creates a file.
//         fs.appendFile(path.join(__dirname, 'files', 'starter.txt'), 'My Rock world!!!', (err) => {
//             if (err) throw err;
//             console.log('Append Complete!!!');
//         })
//     })
// })

// fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

console.log("Hello...");

//exit no oncaught exception
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
})