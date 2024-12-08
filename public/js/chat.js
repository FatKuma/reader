document.getElementById('sendQuery').addEventListener('click', function() {
    const userQuery = document.getElementById('userQuery').value;
    fetch('/api/qwen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userQuery })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.response;
    })
    .catch(error => console.error('Error:', error));
}); 