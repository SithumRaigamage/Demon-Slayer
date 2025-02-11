function switchPlan(plan) {
    if (plan === 'tv') {
        document.getElementById('tv-series').style.display = 'flex';
        document.getElementById('movies').style.display = 'none';
        document.getElementById('tv-btn').classList.add('active');
        document.getElementById('movies-btn').classList.remove('active');
    } else {
        document.getElementById('tv-series').style.display = 'none';
        document.getElementById('movies').style.display = 'flex';
        document.getElementById('movies-btn').classList.add('active');
        document.getElementById('tv-btn').classList.remove('active');
    }
}