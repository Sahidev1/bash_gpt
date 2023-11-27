const { error } = require('console');
const fs = require('fs');
const path = require('path');

const TEMP_FILE_PATH = process.env.BASHGPT_TEMP_FILE;

const NO_TEMPFILE_WARNING = "Temp file not found!, make sure"+
"you run this programming use the bash script!";

/**
 * Function that reads the contents of the current shell sessions temporary bashgpt data 
 */
const readTempFile = () => {
    if (!TEMP_FILE_PATH) throw new Error(NO_TEMPFILE_WARNING);
    try {
        return fs.readFileSync(TEMP_FILE_PATH);
    } catch (error) {
        console.error('error', error);
    }
}

/**
 * Writes updated data to temporary file, for example add the prompt and prompt response to the temporary bashgpt file
 * @param {*} data 
 * @returns 
 */
const writeTempFile = (data) => {
    if (!TEMP_FILE_PATH) throw new Error(NO_TEMPFILE_WARNING);
    try {
        return fs.writeFileSync(TEMP_FILE_PATH, data);
    } catch (error) {
        console.error('error', error);
    }
}

/**
 * This function gets the array of messages so far in this shell session for new calls to openai chatgpt API, so the AI 
 * can have a context in its answer to the prompt.
 * @returns 
 */
const getMsgArrFromTmp = () => {
    try {
        const readData = readTempFile().toString();
        return readData?JSON.parse(readData)?.messages:[];
    } catch (error) {
        console.error('error', error.message);
        throw error;
    }
}

/**
 * This function writes the updated message array after the response to the prompt has been received.
 * @param {*} arr 
 */
const writeMsgArrToTmp = (arr) => {
    const arrObj = {messages: arr};
    const jsonString = JSON.stringify(arrObj);
    try {
        writeTempFile (jsonString);
    } catch (error) {
        console.error('error', error.message);
        throw error;
    }
}

const clearSessionHistory = () => {
    try {
        writeTempFile(JSON.stringify({messages: []}));
    } catch (error) {
        console.error('error', error.message);
        throw error;
    }
}

// function that reads the json config file
const readConfig = () => {
    const configPath = path.join(__dirname, 'conf.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configFile);
}

// function that writes to the json config file
const writeConfig = (config) => {
    const configPath = path.join(__dirname, 'conf.json');
    const configData = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, configData, 'utf8');
}

module.exports = {getMsgArrFromTmp, writeMsgArrToTmp, readConfig, writeConfig, clearSessionHistory}
