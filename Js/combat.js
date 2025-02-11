
document.addEventListener('DOMContentLoaded', () => {
    const combatStyles = [
        { name: 'Sun Breathing', description: 'Breathing Style only known and taught by the Kamado Family, later revealed to be the first Breathing Style', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/sun-breathing.webp' },
        { name: 'Water Breathing', description: 'Water Breathing is one of the five main Breathing Styles directly derived from Sun Breathing.', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/water-breathing.webp' },
        { name: 'Thunder Breathing', description: 'Thunder Breathing is a Breathing Style that mimics lightning, specifically swift strikes and movements akin to lightning ripping through the sky', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/thunder-breathing.webp' },
        { name: 'Flame Breathing', description: 'Flame Breathing is one of the five main Breathing Styles directly derived from the Sun Breathing. This breathing style mimics flames', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/flame-breathing.webp' },
        { name: 'Beast Breathing', description: 'Beast Breathing is a Breathing Style that mimics beasts/wild animals, specifically their unpredictable, ferocious and wild nature', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/beast-breathing.webp' },
        { name: 'Wind Breathing', description: 'Wind Breathing mimics wind, specifically powerful torrents of air and whirlwinds, and replicates it with the user´s movements', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/wind-breathing.webp' },
        { name: 'Insect Breathing', description: 'Insect Breathing is a Breathing Style that mimics insects, specifically their lethal stings and movements', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/insect-breathing.webp' },
        { name: 'Sound Breathing', description: 'A Breathing Style that Tengen created himself combining heightened sense of hearing, Musical Score technique and shinobi expertise', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/sound-breathing.webp' },
        { name: 'Love Breathing', description: 'Love Breathing incorporates elements of superhuman flexibility and unique whip-like Nichirin Sword techniques', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/love-breathing.webp' },
        { name: 'Mist Breathing', description: 'Mist Breathing is a Breathing Style that mimics mist, specifically its ability to obscure and confuse', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/mist-breathing.webp' },
        { name: 'Serpent Breathing', description: 'Serpent Breathing is a Breathing Style that mimics serpents, specifically their speed, agility and unpredictability', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/serpent-breathing.webp' },
        { name: 'Combustible Blood Breathing', description: 'Combustible Blood Breathing is a Breathing Style that mimics the user´s blood, specifically its ability to explode and burn', image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/combustible-blood.webp' },
        { name: "Biokinesis", description: "Muzan´s Blood Demon Art grants him powerful biokinetic abilities, most prominently the ability to manipulate his body at will and shapeshift instantly.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/biokinesis.webp'},
        { name: "Thread Manipulation", description: "Rui´s Blood Demon Art allowed him to create thin threads indiscernible from silk from his own flesh and manipulate them however he pleased.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/thread-manipulation.webp'},
        { name: "Sleep Inducement", description: "Enmu´s Blood Demon Art granted him the ability to force anyone into a deep sleep.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/sleep-inducement.webp'},
        { name: "Destructive Death", description: "Akaza´s Blood Demon Art is centered around martial arts, combining the manipulation of destructive shockwaves and the Soryu style martial arts.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/destructive-death.webp'},
        { name: "Obi Sash Manipulation", description: "Daki´s Blood Demon Art allowed her to create flower-patterned obi sashes from her flesh, as well as freely manipulating them at will", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/obi-manipulation.webp'},
        { name: "Blood Manipulation", description: "Gyutaro´s Blood Demon Art allowed him to manipulate his own body´s blood in various ways.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/blood-manipulation.webp'},
        { name: "Emotion Manifestation", description: "Hantengu´s Blood Demon Art allows him to manifest his emotions as younger clones of himself.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/emotion-manifestation.webp'},
        { name: "Porcelain Vase Spells", description: "Gyokko´s Blood Demon Art permit him spawn pots anywhere around.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/porcelain-vase.webp'},
        { name: "Infinity Castle Manipulation", description: "Nakime´s Blood Demon Art takes the form of an extra-dimensional space that houses a fortress of immense scale.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/infinite-castle.webp'},
        { name: "Moon Breathing", description: "Kokushibo is the first demon that utilized Breathing Styles. His Moon Breathing is one of the most dangerous and powerful ones.", image: 'https://www.demonslayer-api.com/api/v1/combat-styles/images/moon-breathing.webp'},
        { name: "Flower Breathing", description: "Kanao Tsuyuri is the only known user of Flower Breathing, a Breathing Style that mimics the beauty and grace of flowers.", image: 'flower breathing.jpeg'},
        { name: "Stone Breathing", description: "Gyomei Himejima is the only known user of Stone Breathing, a Breathing Style that mimics the strength and resilience of stone.", image: 'stone breathing.jpeg'},
        ];

    const renderItems = () => {
        const container = document.getElementById('combatContainer');
        container.innerHTML = '';

        combatStyles.forEach(style => {
            container.innerHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <div class="card">
                        <img src="${style.image}" class="card-img-top" alt="${style.name}" style="height: 200px; object-fit: cover;">
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
    renderItems();
});
