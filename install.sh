#!/bin/bash

read -p "This script will modify your .bashrc file and install the bashgpt package, a bashrc backup will be created. Are you sure you want to proceed? [y/N] " answer
case ${answer:0:1} in
    y|Y )
        echo "Proceeding with the installation..."
    ;;
    * )
        echo "Installation cancelled by the user."
        exit 1
    ;;
esac

install_path="$HOME/.local/bin"  # Use $HOME instead of ~ for reliable path expansion
install_dir="${install_path}/bash_gpt"

open_ai_key=$1 # first arg should be the open_ai key.

if [ ! -d "$install_path" ]; then  # Check if directory exists before creating it
    mkdir -p "$install_path" || { echo 'Failed to create the install path'; exit 1;} # Use -p to make parent directories as needed
fi 

wget https://github.com/Sahidev1/bash_gpt/archive/refs/heads/main.zip -O "${install_path}/bash_gpt.zip"|| { echo 'Failed to download instal files'; exit 1;}

# The unzip command will create a new directory called "bash_gpt-main", so we need to handle that
unzip "${install_path}/bash_gpt.zip" -d "$install_path" || { echo 'failed to unzip install files'; exit 1;}
mv "${install_path}/bash_gpt-main" "$install_dir" || { echo 'failed to rename install path'; exit 1;}
rm "${install_path}/bash_gpt.zip"



cd $install_dir
npm install

echo '"OPENAI_API_KEY":"'"${open_ai_key}"'"' > "conf.json"

rm install.sh
cp ~/.bashrc ~/.bashrc.bak

if ! grep -q 'function bashgpt() {' ~/.bashrc; then
    echo 'function bashgpt() {' >> ~/.bashrc
    echo "    source ${install_dir}/bashgpt.sh "'"$@"' >> ~/.bashrc
    echo '}' >> ~/.bashrc
fi