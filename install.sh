#!/bin/bash

install_path="$HOME/.local/bin"  # Use $HOME instead of ~ for reliable path expansion
install_dir="${install_path}/bash_gpt"

open_ai_key=$1

if [ ! -d "$install_path" ]; then  # Check if directory exists before creating it
    mkdir -p "$install_path"  # Use -p to make parent directories as needed
fi 

wget https://github.com/Sahidev1/bash_gpt/archive/refs/heads/main.zip -O "${install_path}/bash_gpt.zip"

# The unzip command will create a new directory called "bash_gpt-main", so we need to handle that
unzip "${install_path}/bash_gpt.zip" -d "$install_path"
mv "${install_path}/bash_gpt-main" "$install_dir"

npm install $install_dir

echo "OPENAI_API_KEY=${open_ai_key}" > "${install_dir}/.env"

mv "${install_dir}/index.js" "${install_dir}/bashgpt"

echo "export PATH=${PATH}:${install_dir}" >> ~/.bashrc
