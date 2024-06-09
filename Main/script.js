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
});


