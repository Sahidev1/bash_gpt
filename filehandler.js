const { error } = require('console');
const fs = require('fs');
const path = require('path');

const TEMP_FILE_PATH = process.env.BASHGPT_TEMP_FILE;

const NO_TEMPFILE_WARNING = "Temp file not found!, make sure"+
"you run this programming use the bash script!";

const readTempFile = () => {
    if (!TEMP_FILE_PATH) throw new Error(NO_TEMPFILE_WARNING);
    try {
        return fs.readFileSync(TEMP_FILE_PATH);
    } catch (error) {
        console.error('error', error);
    }
}

// Note this function overwrites everything in the file
const writeTempFile = (data) => {
    if (!TEMP_FILE_PATH) throw new Error(NO_TEMPFILE_WARNING);
    try {
        return fs.writeFileSync(TEMP_FILE_PATH, data);
    } catch (error) {
        console.error('error', error);
    }
}

const getMsgArrFromTmp = () => {
    try {
        const readData = readTempFile().toString();
        return readData?JSON.parse(readData)?.messages:[];
    } catch (error) {
        console.error('error', error);
    }
}

const writeMsgArrToTmp = (arr) => {
    const arrObj = {messages: arr};
    const jsonString = JSON.stringify(arrObj);
    try {
        writeTempFile (jsonString);
    } catch (error) {
        console.error('error', error);
    }
}

const readConfig = () => {
    const configPath = path.join(__dirname, 'conf.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configFile);
}

const writeConfig = (config) => {
    const configPath = path.join(__dirname, 'conf.json');
    const configData = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, configData, 'utf8');
}

module.exports = {getMsgArrFromTmp, writeMsgArrToTmp, readConfig, writeConfig}
