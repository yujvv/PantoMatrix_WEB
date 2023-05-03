from flask import Flask, request
from flask_cors import CORS
import json
import subprocess
import chatgpt
import command

app = Flask(__name__)
# 跨域请求
CORS(app)

@app.route('/log', methods=['POST'])
def receive_message():
    message = request.get_data()
    print(message)
    
    # # 请求openai接口
    # data = request.get_json()
    # prompt = data.get('prompt')
    # text = chatgpt.sendGpt(prompt)

    # # 重写text文件
    # with open('/home/ubuntu/TTS/text', 'w') as file:
    #     file.write(text.get('text'))

    # return text

    command.run_commands()


    # 构建响应数据
    response_data = {'text': 'this is the response of chatgpt!'}

    # 将响应数据转换为JSON字符串并返回
    return json.dumps(response_data)

    # curl -X POST -d "Hello, Flask!" http://localhost:5000/log


@app.route('/get_message', methods=['GET'])
def get_message():
    return 'Hello, GET!'

    # curl http://localhost:1111/get_message


if __name__ == '__main__':
    app.run(port=1111)


# export FLASK_APP=app.py
# set FLASK_APP=app.py
# flask run
# 访问http://localhost:5000