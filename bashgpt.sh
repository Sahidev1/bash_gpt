#!/bin/bash
# run this script with sourcing. 

#check if BASHGPT_TEMP_FILE environment variable exists.
if [ -z "$BASHGPT_TEMP_FILE" ]; then
    export BASHGPT_TEMP_FILE="/tmp/bashgpt_tmp_$(date +%s%N)-$$.txt"
    touch $BASHGPT_TEMP_FILE || { echo 'Failed to create temp file'; exit 1; }
fi

# check if trap is not set yet
if [ -z "$BASHGPT_TRAP_SET" ]; then
  # setting trap to delete file on session end
  trap 'rm -f $BASHGPT_TEMP_FILE' EXIT

  # export the variable to mark that trap was set
  export BASHGPT_TRAP_SET=true
fi

# call nodejs script, make sure to cover all possible parameters.
INDEX_PATH="$HOME/.local/bin/bash_gpt/index.js"
node $INDEX_PATH "$@" || { echo 'Failed run bashgpt node program'; exit 1;}
