const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const { stdoutDataStreamFilter } = require("./util");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const prompt = async (msg, role) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: role||"user", content: msg}],
            stream:true,
        }, { responseType: 'stream'});
        console.log(`ROLE: ${role}\nMESSAGE:\n`);
        completion.data.on('data', (data) => stdoutDataStreamFilter(data));

    } catch (error) {
        console.error('error', error);
    }
}

module.exports = prompt;