#!/usr/bin/env node
const readline = require("readline");

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./opthandler");
const {getMsgArrFromTmp, writeMsgArrToTmp, writeConfig, readConfig, clearSessionHistory} = require("./filehandler");

const scanStdin = async (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

const interactiveChat = async () => {
    let msgArr = getMsgArrFromTmp();
    let responseMsg;
    const EXIT_COMMAND = "exit";
    let curr_input;
    console.log("Interactive chat mode, type exit to quit");
    do {
        curr_input = await scanStdin('\x1b[1m\x1b[32m' + 'User>' + '\x1b[0m');
        if (curr_input !== EXIT_COMMAND){
            msgArr = [...msgArr, {role: "user", content: curr_input}];
            responseMsg = await prompt(msgArr);
            msgArr = [...msgArr, {role: "assistant", content: responseMsg}];
        }
    } while (curr_input !== EXIT_COMMAND);
    writeMsgArrToTmp(msgArr);
}


const mainf = async () => 
{
    try {
        const args = parseArgs();
        if (args.api_key){
            const config = readConfig();
            config.OPENAI_API_KEY = args.api_key;
            writeConfig(config);
            console.log("API keys updated\nIf prompting causes errors try opening a new terminal window\n");
        }
        else if (args.model){
            const config = readConfig();
            config.GPT_MODEL = args.model;
            writeConfig(config);
            console.log("GPT Model updated!");
        }
        else if (args.clear_history){
            const answer = await scanStdin("Are you sure you want to clear session history? (y/n): ");
            if (answer === "y"){
                clearSessionHistory();
                console.log("Session history cleared!");
            }
            else {
                console.log("Session history not cleared!");
            }
        }
        else if (args.interactive){
            await interactiveChat();
        } else {
            const msgArr = getMsgArrFromTmp();
            const updatedMsgArr = [...msgArr, {role: args.role || "user", content: args.prompt}];
            const responsemsg = await prompt(updatedMsgArr);
            writeMsgArrToTmp([...updatedMsgArr, {role: "assistant", content: responsemsg}]);
        }
    } catch (error) {
        console.error('error', error);
    }
}


mainf();




