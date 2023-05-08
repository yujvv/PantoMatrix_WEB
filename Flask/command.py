import subprocess
import time

def run_commands():
    # first_command = 'cd /home/ubuntu/Data/Demo&&python synthesize.py'
    # subprocess.run(first_command, shell=True)

    env_name = 'aaa'
    first_command = ['python', '/home/ubuntu/Data/Demo/synthesize.py']
    subprocess.run(['conda', 'run', '-n', env_name] + first_command, check=True)

    
    # 等待 1 秒钟，或者等待第一个命令完成后，再运行第二个命令
    time.sleep(1)

    # second_command = 'cd /home/ubuntu/codes/audio2pose&&python test_wild.py -c ./configs/test_wild.yaml'
    # subprocess.run(second_command, shell=True)

    env_name = 'bbb'
    second_command = ['python', '/home/ubuntu/codes/audio2pose/test_wild.py', '-c', './configs/test_wild.yaml']
    subprocess.run(['conda', 'run', '-n', env_name] + second_command, check=True)

