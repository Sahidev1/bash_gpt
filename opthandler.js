const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const parseArgs = () => {
    const argv = yargs(hideBin(process.argv))
        .option('role', {
            alias: 'r',
            type: 'string',
            description: 'Choose role of AI'
        })
        .option('message' ,{
            alias: 'm',
            type: 'string',
            description: 'Prompt message'
        })
        .help()
        .alias('help', 'h')
        .argv;
    
        const params = {role: argv.role||'user'};
        if (argv.message) {
            params.message = argv.message;
            return params;
        }
        else {
            throw new Error('No prompt detected, use -h for help');
        }
}

module.exports = {parseArgs};