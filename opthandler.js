const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const parseArgs = () => {
    const argv = yargs(hideBin(process.argv))
        .option('role', {
            alias: 'r',
            type: 'string',
            description: 'Choose your role to prompt AI with, only user and system are valid roles',
            choices: ['system', 'user'],
            default: 'user'
        })
        .option('prompt' ,{
            alias: 'p',
            type: 'string',
            description: 'Prompt message'
        }).option('api_key', {
            alias: 'k',
            type: 'string',
            description: 'Change or add API_KEY env variable'
        }).option('set_model', {
            alias:'m',
            type:'string',
            description:'Change GPT model'
        }).option('clear_history',{
            alias:'c',
            type:'boolean',
            description:'Clear shell session chat history, useful if prompting stops working'
        }).option('interactive',{
            alias:'i',
            type:'boolean',
            description:'Interactive chat mode'
        })
        .help()
        .alias('help', 'h')
        .argv;

        if (argv.api_key) {
            return {api_key: argv.api_key};
        }
        else if (argv.clear_history) {
            return {clear_history: true};
        }
        else if (argv.interactive) {
            return {interactive: true};
        }
        else if (argv.set_model){
            return {model: argv.set_model};
        }
        else if (argv.prompt) {
            return { role: argv.role, prompt: argv.prompt};
        }
        else {
            throw new Error('No prompt detected, use -h for help');
        }
}

module.exports = {parseArgs};