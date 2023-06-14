#!/usr/bin/env node

const prompt = require ("./chatgpt");
const {parseArgs} = require ("./argHandler");

try {
    args = parseArgs();
    prompt(args.message, args.role);
} catch (error) {
    console.error('error', error)
}




