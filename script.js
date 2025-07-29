document.getElementById('download-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const videoUrl = document.getElementById('video-url').value.trim();
    const messageDiv = document.getElementById('message');

    if (!videoUrl) {
        messageDiv.textContent = 'Please enter a video URL.';
        messageDiv.style.color = 'red';
        return;
    }

    messageDiv.textContent = 'Downloading... Please wait.';
    messageDiv.style.color = 'blue';

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoUrl: videoUrl })
        });

        if (!response.ok) {
            let errorText = 'Unknown error';
            try {
                const errorData = await response.json();
                errorText = errorData.error || errorText;
            } catch {
                errorText = await response.text();
            }
            messageDiv.textContent = 'Error: ' + errorText;
            messageDiv.style.color = 'red';
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // Try to extract filename from content-disposition header
        const disposition = response.headers.get('content-disposition');
        let filename = 'video.mp4';
        if (disposition && disposition.indexOf('filename=') !== -1) {
            const filenameMatch = disposition.match(/filename="?(.+)"?/);
            if (filenameMatch.length > 1) {
                filename = filenameMatch[1];
            }
        }
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        messageDiv.textContent = 'Download started.';
        messageDiv.style.color = 'green';
    } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
        messageDiv.style.color = 'red';
    }
});
