#!/usr/bin/env node

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./opthandler");
const {getMsgArrFromTmp, writeMsgArrToTmp} = require("./filehandler");

const mainf = async () => 
{
    try {
        const args = parseArgs();
        const msgArr = getMsgArrFromTmp();
        const updatedMsgArr = [...msgArr, {role: args.role || "user", content: args.message}];
        const responsemsg = await prompt(updatedMsgArr);
        writeMsgArrToTmp([...updatedMsgArr, {role: "assistant", content: responsemsg}]);
    } catch (error) {
        console.error('error', error);
    }
}

mainf();




