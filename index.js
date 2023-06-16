#!/usr/bin/env node

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./opthandler");

try {
    args = parseArgs();
    prompt(args.message, args.role);
} catch (error) {
    console.error('error', error)
}




