const { error } = require('console');
const fs = require('fs');

const TEMP_FILE_PATH = process.env.TEMP_FILE;

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

module.exports = {getMsgArrFromTmp, writeMsgArrToTmp}
