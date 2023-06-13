const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

console.log(process.env.OPENAI_API_KEY)

const testMsg = "Hello tell me a short story!";

const prompt = async (msg) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: msg}],
            stream:true,
        }, { responseType: 'stream'});
        

        completion.data.on('data', (data) => {
            //console.log(data.toString());
            let chunks = data.toString().split('data: ').filter(elem => elem != '');
            jsonchunks = chunks.map( chunk => {
                return chunk.includes('[DONE]')?'':JSON.parse(chunk);
            });
            let content = jsonchunks.map(chunk => {
                if (chunk === '') return '';
                return chunk?.choices[0]?.delta?.content || '';
            });
            content.forEach(element => {
                process.stdout.write(element);
            });
        });

    } catch (error) {
        console.error('error', error);
    }
}

prompt(testMsg);

/*res.data.on('data', data => {
    const lines = data.toString().split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
            return; // Stream finished
        }
        try {
            const parsed = JSON.parse(message);
            console.log(parsed.choices[0].text);
        } catch(error) {
            console.error('Could not JSON parse stream message', message, error);
        }
    }
});
*/


