# bash_gpt
chatgpt from linux terminal!

I've made a install script for making the program accessible from anywhere, it can also be done manually. 

NOTE: You run the script at your own risk. 

Getting the install shell script: 

curl -o install.sh https://raw.githubusercontent.com/Sahidev1/bash_gpt/main/install.sh

Making script executable:

chmod +x install.sh

Check shell script to make sure it is safe. 

Executing script with your open ai key: 

./install.sh YOUR_OPEN_AI_KEY

Usage example: 

bashgpt -r "assistant" -m "how to code in C?"

-r: role of AI, if omitted then defaults to the role "user"
-m: The prompt. 


