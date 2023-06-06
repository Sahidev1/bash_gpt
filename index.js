const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

console.log(process.env.OPENAI_API_KEY)

const testMsg = "Hello tell me a short story!"

openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages:[{role:"user", content: testMsg}],
    stream: false,
}).then(comp => console.log(comp));
