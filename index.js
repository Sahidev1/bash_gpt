#!/usr/bin/env node

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./opthandler");
const {getMsgArrFromTmp, writeMsgArrToTmp, writeConfig, readConfig} = require("./filehandler");

const mainf = async () => 
{
    try {
        const args = parseArgs();
        if (args.api_key){
            const config = readConfig();
            config.OPENAI_API_KEY = args.api_key;
            writeConfig(config);
            console.log("API keys updated\nIf prompting causes errors try opening a new terminal window\n");
            process.exit(0);
        }

        if (args.model){
            const config = readConfig();
            config.GPT_MODEL = args.model;
            writeConfig(config);
            console.log("GPT Model updated!");
            process.exit(0);
        }

        const msgArr = getMsgArrFromTmp();
        const updatedMsgArr = [...msgArr, {role: args.role || "user", content: args.prompt}];
        const responsemsg = await prompt(updatedMsgArr);
        writeMsgArrToTmp([...updatedMsgArr, {role: "assistant", content: responsemsg}]);
    } catch (error) {
        console.error('error', error);
    }
}

mainf();




