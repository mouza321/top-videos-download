function fetchVideoInfo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    // Reset UI
    errorMessage.classList.add('hidden');
    document.getElementById('video-info').classList.add('hidden');
    
    // Validate URL
    if (!videoUrl) {
        errorMessage.textContent = 'الرجاء إدخال رابط الفيديو';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Show loader
    document.getElementById('loader').classList.remove('hidden');
    
    // Simulate API call with timeout (in a real app, this would be an actual API call)
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        
        // Check for valid URL pattern
        if (!isValidUrl(videoUrl)) {
            errorMessage.textContent = 'رابط غير صالح. الرجاء التأكد من صحة الرابط';
            errorMessage.classList.remove('hidden');
            return;
        }
        
        // Simulate successful response (in a real app, this would come from the API)
        const videoData = {
            title: 'فيديو توضيحي عن كيفية استخدام الموقع',
            duration: '2:45',
            thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a7be937-7170-432c-a05d-b07e0c66ab93.png',
            qualities: [
                { quality: '1080p', url: '#' },
                { quality: '720p', url: '#' },
                { quality: '480p', url: '#' },
                { quality: '360p', url: '#' }
            ]
        };
        
        // Update UI with video info
        document.getElementById('video-title').textContent = videoData.title;
        document.getElementById('video-duration').textContent = `المدة: ${videoData.duration}`;
        document.getElementById('video-thumbnail').src = videoData.thumbnail;
        document.getElementById('video-thumbnail').alt = `صورة مصغرة للفيديو - ${videoData.title}`;
        
        // Populate quality options
        const qualitySelect = document.getElementById('quality-select');
        qualitySelect.innerHTML = '<option value="" selected disabled>-- اختر الجودة --</option>';
        videoData.qualities.forEach(quality => {
            const option = document.createElement('option');
            option.value = quality.url;
            option.textContent = quality.quality;
            qualitySelect.appendChild(option);
        });
        
        // Show video info
        document.getElementById('video-info').classList.remove('hidden');
    }, 1500);
}

function downloadVideo() {
    const qualitySelect = document.getElementById('quality-select');
    const selectedQualityUrl = qualitySelect.value;
    
    if (!selectedQualityUrl) {
        alert('الرجاء اختيار جودة التحميل أولاً');
        return;
    }
    
    // In a real app, this would initiate the download
    alert('جاري تحميل الفيديو... (هذه مجرد واجهة توضيحية)');
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
