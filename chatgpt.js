const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config({
    path: require('path').resolve(__dirname, './.env')
});  
const { stdoutDataStreamFilter } = require("./util");
const { readConfig } = require("./filehandler");

const jsonConfig = readConfig();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || jsonConfig.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

//valid roles for prompt: user and system
const prompt = async (messages) => {
    if(!process.env.OPENAI_API_KEY && !jsonConfig.OPENAI_API_KEY){
        throw new Error('No OPEN_API_KEY detected, run bashgpt with -k parameter with your openai key to set keys or change keys')
    }
    try {
        const completion = await openai.createChatCompletion({
            model: jsonConfig.GPT_MODEL||"gpt-3.5-turbo",
            messages: messages,
            stream:true,
        }, { responseType: 'stream'});
        console.log(`MESSAGE:\n`);
        let accumData = "";

        return new Promise((resolve, reject) => {
            completion.data.on('data', (data) => {
                let content = stdoutDataStreamFilter(data);
                accumData = accumData.concat(content);
            });
            completion.data.on('end', () => {
                resolve(accumData);
            });
            completion.data.on('error', (err) => {
                reject(err);
            });
        });

    } catch (error) {
        console.error('If your openai key doesnt work and you want to change it use bashgpt with -k option along with new openai key to change it', error.message);
    }
}

module.exports = prompt;