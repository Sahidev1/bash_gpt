const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config({
    path: require('path').resolve(__dirname, './.env')
});  
const { stdoutDataStreamFilter } = require("./util");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

//valid roles for prompt: user and system
const prompt = async (messages) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
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
        console.error('error', error);
    }
}

module.exports = prompt;