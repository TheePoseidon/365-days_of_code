#!/bin/bash
echo "Choose an option:"
echo "1) Show date"
echo "2) List files"
echo "3) Show current directory"
echo "4) Exit"

read choice
case $choice in
    1) date ;;
    2) ls ;;
    3) pwd ;;
    4) echo "Goodbye!"; exit ;;
    *) echo "Invalid option!" ;;
esac