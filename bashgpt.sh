#!/bin/bash
# run this script with sourcing. 

#check if TEMP_FILE environment variable exists.
if [ -z "$TEMP_FILE" ]; then
    export TEMP_FILE="/tmp/bashgpt_tmp_$(date +%s%N)-$$.txt"
    touch $TEMP_FILE
fi

# check if trap is not set yet
if [ -z "$TRAP_SET" ]; then
  # setting trap to delete file on session end
  trap 'rm -f $TEMP_FILE' EXIT

  # export the variable to mark that trap was set
  export TRAP_SET=true
fi

# call nodejs script, make sure to cover all possible parameters.
INDEX_PATH="$HOME/.local/bin/bash_gpt/index.js"
node $INDEX_PATH $1 "$2" $3 "$4"
