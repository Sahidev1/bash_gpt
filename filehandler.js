const { error } = require('console');
const fs = require('fs');

const tmpFolderPaths = ['/tmp', '/var/tmp','/run/user/'+process.env.UID+'/tmp'] 
const filename = 'bashgpt_tmp'+process.env.sid+'.txt';

const findtmp = () => {
    let foundPath;
    if ((foundPath = tmpFolderPaths.find(path => fs.existsSync(path)))) return foundPath;
    else throw new Error("No temp folder found");
}

const jsonWrite = (contentarr ,content) => {
    try {
        const tmpPath = findtmp();
        const filePath = tmpPath.concat('/bashgpt')
    } catch (error) {
        console.error('error', error);
    }
}
