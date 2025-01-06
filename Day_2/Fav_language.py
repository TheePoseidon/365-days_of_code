favorite_language = []

# Allow user to input their favorite languages
while True:
    language = input("Your fav programming language: ")
    if language.lower() == "done":
        break
    favorite_languages.append(language)

# Print the list
for language in favorite_language:
    print(f"I love {language}!")

print("That's my list of favorite programming languages!")