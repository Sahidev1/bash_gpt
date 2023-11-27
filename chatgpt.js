const { OpenAI } = require("openai");
const { readConfig } = require("./filehandler");
require('dotenv').config({
    path: require('path').resolve(__dirname, './.env')
});  

const jsonConfig = readConfig();

const config = {
    apiKey: process.env.OPENAI_API_KEY || jsonConfig.OPENAI_API_KEY,
};

const openai = new OpenAI(config);

const prompt = async (messages) => {
    if(!process.env.OPENAI_API_KEY && !jsonConfig.OPENAI_API_KEY){
        throw new Error('No OPEN_API_KEY detected, run bashgpt with -k parameter with your openai key to set keys or change keys')
    }
    try {
        const stream = await openai.chat.completions.create({
            model: jsonConfig.GPT_MODEL||"gpt-3.5-turbo",
            messages: messages,
            stream:true,
        });
        let accumdata = "";
        let chunkdata = "";
        process.stdout.write("AI@chatgpt: ");
        for await (const chunk of stream){
            chunkdata = chunk.choices[0]?.delta?.content || '';
            process.stdout.write(chunkdata);
            accumdata = accumdata.concat(chunkdata);
        }
        process.stdout.write('\n');
        accumdata = accumdata.concat('\n');
        return accumdata;
    } catch (error) {
        console.error('If your openai key doesnt work and you want to change it use bashgpt with -k option along with new openai key to change it\n', error.messages);
    }
}

module.exports = prompt;