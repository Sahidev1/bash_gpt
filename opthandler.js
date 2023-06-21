const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const parseArgs = () => {
    const argv = yargs(hideBin(process.argv))
        .option('role', {
            alias: 'r',
            type: 'string',
            description: 'Choose your role to prompt AI with, only user and system are valid roles'
        })
        .option('prompt' ,{
            alias: 'p',
            type: 'string',
            description: 'Prompt message'
        }).option('api_key', {
            alias: 'k',
            type: 'string',
            description: 'Change or add API_KEY env variable'
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