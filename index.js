#!/usr/bin/env node
const readline = require("readline");

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./opthandler");
const {getMsgArrFromTmp, writeMsgArrToTmp, writeConfig, readConfig, clearSessionHistory} = require("./filehandler");
const { stdin } = require("process");

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

        if (args.clear_history){
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
            try {
                const answer = await scanStdin("Are you sure you want to clear session history? (y/n): ");
                if (answer === "y"){
                    clearSessionHistory();
                    console.log("Session history cleared!");
                }
                else {
                    console.log("Session history not cleared!");
                }
                process.exit(0);
            } catch (error) {
                console.error('error', error);
            }      
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




