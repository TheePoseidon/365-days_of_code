import openai

# Configure OpenAI API Key
openai.api_key = "your_openai_api_key"

@app.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    user_message = data.get("message")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_message}]
    )

    return jsonify({"response": response['choices'][0]['message']['content']})
