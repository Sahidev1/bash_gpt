# Bash_GPT

Chat with OpenAI's GPT-3 model from your linux terminal!

Note that this program is very basic, it lacks persistence of messages so the AI does not have "memory". Persistance will be implemented later on.

## Installation

You can install bash_gpt in two ways, either by running the provided install script or manually. 

**Note**: You run the script at your own risk.

### Install Script

To use the install script, run the following command in your terminal: 

```shell
curl -o install.sh https://raw.githubusercontent.com/Sahidev1/bash_gpt/main/install.sh
```

Then, make the script executable by running: 

```shell
chmod +x install.sh
```

Finally, execute the script with your open ai key:

```shell
./install.sh YOUR_OPEN_AI_KEY
```


## Usage

To use `bash_gpt`, run commands like this example:

```shell
bashgpt -r "assistant" -m "how to program a duck in C?"
```

Note that `-r` is to set the persona (or "AI identity") that will be used in the conversation while `-m` sets the message that you want to start the conversation with. 
if `-r`is omitted the role defaults to "user".

## Disclaimer

Please note that this project comes with no warranty or guarantees of any kind. You are solely responsible for any damage or loss of data that may occur while using the script. Use it at your own risk.



