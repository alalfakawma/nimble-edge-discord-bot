const fs = require('fs');

const stubPath = __dirname + '/stubs/';
const commandPath = __dirname + '/commands/';

fs.readFile(stubPath + 'command.stub', {
    encoding: 'utf8',
}, (err, contents) => {
    if (err) return console.error(err);

    const fileContents = contents;

    const args = process.argv.slice(2);

    if (!args[0]) {
        return console.error('Need atleast 1 argument!');
    }

    fs.writeFile(commandPath + args[0] + '.ts', fileContents, {
        encoding: 'utf8',
    }, (err) => {
        if (err) console.error(err);
        console.log(`Command ${args[0]} created!`);
    });
});
