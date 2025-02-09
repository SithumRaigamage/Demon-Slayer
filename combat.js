
document.addEventListener('DOMContentLoaded', () => {
    const combatStyles = [
        { name: 'Sun Breathing', description: 'Breathing Style only known and taught by the Kamado Family, later revealed to be the first Breathing Style', image: 'sun.webp' },
        { name: 'Water Breathing', description: 'Water Breathing is one of the five main Breathing Styles directly derived from Sun Breathing.', image: 'water.webp' },
        { name: 'Thunder Breathing', description: 'Thunder Breathing is a Breathing Style that mimics lightning, specifically swift strikes and movements akin to lightning ripping through the sky', image: 'thunder.webp' },
        { name: 'Flame Breathing', description: 'Flame Breathing is one of the five main Breathing Styles directly derived from the Sun Breathing. This breathing style mimics flames', image: 'flame.webp' },
        { name: 'Beast Breathing', description: 'Beast Breathing is a Breathing Style that mimics beasts/wild animals, specifically their unpredictable, ferocious and wild nature', image: 'beast.webp' },
        { name: 'Wind Breathing', description: 'Wind Breathing mimics wind, specifically powerful torrents of air and whirlwinds, and replicates it with the user´s movements', image: 'wind.webp' },
        { name: 'Insect Breathing', description: 'Insect Breathing is a Breathing Style that mimics insects, specifically their lethal stings and movements', image: 'insect.webp' },
        { name: 'Sound Breathing', description: 'A Breathing Style that Tengen created himself combining heightened sense of hearing, Musical Score technique and shinobi expertise', image: 'sound.webp' },
        { name: 'Love Breathing', description: 'Love Breathing incorporates elements of superhuman flexibility and unique whip-like Nichirin Sword techniques', image: 'love.webp' }
    ];

    const itemsPerPage = 3;
    let currentPage = 1;

    const renderItems = (page) => {
        const container = document.getElementById('combatContainer');
        container.innerHTML = '';
        
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = combatStyles.slice(start, end);

        paginatedItems.forEach(style => {
            container.innerHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <div class="card">
                        <img src="assets/images/${style.image}" class="card-img-top" alt="${style.name}">
                        <div class="card-body">
                            <h5 class="card-title">${style.name}</h5>
                            <p class="card-text">${style.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    // Initial render
    renderItems(currentPage);

    // Handle pagination clicks
    document.querySelector('.pagination').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('page-link')) {
            const pageNum = parseInt(e.target.textContent);
            if (!isNaN(pageNum)) {
                currentPage = pageNum;
                renderItems(currentPage);
            } else if (e.target.classList.contains('fa-angle-left')) {
                if (currentPage > 1) {
                    currentPage--;
                    renderItems(currentPage);
                }
            } else if (e.target.classList.contains('fa-angle-right')) {
                if (currentPage < Math.ceil(combatStyles.length / itemsPerPage)) {
                    currentPage++;
                    renderItems(currentPage);
                }
            }
        }
    });
});
