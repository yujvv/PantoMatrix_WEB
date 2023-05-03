fetch('http://localhost:1111/run-command', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'config_path': '/path/to/config',
        'checkpoint_path': '/path/to/checkpoint'
    })
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});
