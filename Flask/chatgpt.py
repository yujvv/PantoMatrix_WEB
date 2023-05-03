import openai

def sendGpt(prompt):
    openai.api_key = "sk-0000"
    # prompt = "who are u and how are u?"
    response = openai.Completion.create(
        engine = "text-davinci-003",
        prompt = prompt,
        timeout = 20,
        # max_token = 1000,
    )

    print(response.choices[0].text)
    return response.choices[0]