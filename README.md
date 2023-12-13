# Bash_GPT

### Current status: 2023-10-13 Functioning, works fine after using most recent OpenAPI library.

Chat with OpenAI's GPT-3 model from your Linux terminal!

This application now supports persistent conversations, allowing the AI to retain "memory" from previous interactions within the current active shell session, note that all conversation data is lost when the shell session is ended.

Below is a short demo:

[output.webm](https://github.com/Sahidev1/bash_gpt/assets/80922338/b574b029-1368-4e34-9982-58a77cda7d93)

## Requirements and Dependencies

You need Node.js 14.2.0 or higher. You also need NPM to install the program's dependencies. The program's dependencies can be seen in the package.json file.
## Installation

To install Bash_GPT, please use the provided installation script.

Note: You run the script at your own risk. Make sure to review it before running.
### Using the Installation Script

To use the install script, run the following commands in your terminal:


```
curl -o- https://raw.githubusercontent.com/Sahidev1/bash_gpt/main/install.sh > install.sh
```

after the script has been installed give it execution permission:
```
chmod +x install.sh
```
Running the installer: 
```
./install.sh YOUR_OPEN_AI_KEY
```
Note that giving your key to the install script is optional you can add it later.


To set up your key if you didn't give it to the install script, do this after running that install script:
```
bashgpt -k YOUR_OPEN_AI_KEY
```

## Uninstalling 
Remove the bashgpt folder from /home/user/.local/bin 

To fully uninstall remove the function bashgpt() from the .bashrc file at /home/user

## Usage

* To see all possible CLI commands do this:
```
bashgpt -h
```

* To use bash_gpt, run commands like this example:


```
bashgpt -r "system" -p "how to program a duck in C?"
```
or omit -r which will default role to user:
```
bashgpt -p "how to program a duck in C?"
```

Note that -r is to set the role (either 'user' or 'system') that will be used in the conversation while -p sets the prompt that you want to start the conversation with. If -r is omitted, the role defaults to "user".

* To change your api key do this: 
```
bashgpt -k YOUR_OPEN_AI_KEY 
```

* To change GPT model do this:
```
bashgpt -m NAME_OF_GPT_MODEL 
```

* To clear session chat history do this:
```
bashgpt -c
```
above command could become nessacary if prompting in the session gets bugged, however all shell chat-session data will be lost. In future a better method of handling corrupted chat-histoty temp file will be created so not all data is lost.

* To enter interactive chat mode do this:
```
bashgpt -i
```
to exit interactive mode in interactive mode type "exit";
If "exit" isn't used for exiting the interactive mode all chat history within that interactive chat will be lost from the shell session. 

## Developers
For now if you want to change the code you still need an installation. 

To run code directly from cloned repository you need to have performed the installation and 
ran the system bashgpt shell command to initialize the tmp file within your session. You also need to add your API-KEY in an .env file in the repository. Then you can run your version of the program directly from the repo by running index.js:
```
node index.js -p YOUR_PROMPT
```

This is not ideal. And in the future a way of completely perform this from local repo must be implemented. 

## Disclaimer

Please note that this project comes with no warranty or guarantees of any kind. You are solely responsible for any damage or loss of data that may occur while using the script. Use it at your own risk.
