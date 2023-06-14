
const stdoutDataStreamFilter = (data) => {
    let chunks = data.toString().split('data: ').filter(elem => elem != '');
    jsonchunks = chunks.map( chunk => {
        return chunk.includes('[DONE]')?'':JSON.parse(chunk);
    });
    let content = jsonchunks.map(chunk => {
        if (chunk === '') return '\n';
        return chunk?.choices[0]?.delta?.content || '';
    });
    content.forEach(element => {
        process.stdout.write(element);
    });
}

module.exports = { stdoutDataStreamFilter };