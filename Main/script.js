function toggleWatchStreams() {
    const watchStreams = document.getElementById('watch-streams');
    if (watchStreams.style.display === 'none' || watchStreams.style.display === '') {
        watchStreams.style.display = 'block';
    } else {
        watchStreams.style.display = 'none';
    }
}

// Ensure the watch-streams div is hidden on page load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('watch-streams').style.display = 'none';
    unmuteAudio();
});


function unmuteAudio() {
    const audio = document.getElementById('backgroundAudio');
    audio.muted = false;
    audio.play(); // Add this line to ensure the audio plays
}