// series.js — Series section tab toggle
// Uses CSS class toggle instead of inline style mutation

function switchPlan(plan) {
    const tvSection = document.getElementById('tv-series');
    const moviesSection = document.getElementById('movies');
    const tvBtn = document.getElementById('tv-btn');
    const moviesBtn = document.getElementById('movies-btn');

    if (plan === 'tv') {
        tvSection.classList.remove('d-none');
        moviesSection.classList.add('d-none');
        tvBtn.classList.add('active');
        moviesBtn.classList.remove('active');
    } else {
        tvSection.classList.add('d-none');
        moviesSection.classList.remove('d-none');
        moviesBtn.classList.add('active');
        tvBtn.classList.remove('active');
    }
}