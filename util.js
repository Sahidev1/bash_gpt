function parseOpenAIdata(data) {
    let chunks = data.toString().split('data: ').filter(elem => elem != '');
    jsonchunks = chunks.map(chunk => {
        return chunk.includes('[DONE]') ? '' : JSON.parse(chunk);
    });
    let content = jsonchunks.map(chunk => {
        if (chunk === '')
            return '\n';
        return chunk?.choices[0]?.delta?.content || '';
    });
    return content;
}

const stdoutDataStreamFilter = (data) => {
    let content = parseOpenAIdata(data);
    let contentString = "";
    content.forEach(element => {
        process.stdout.write(element);
        contentString = contentString.concat(element);
    });
    return contentString;
}

module.exports = { stdoutDataStreamFilter };

