const apiUrl = "https://demon-slayer-api.onrender.com/v1/";

const searchBar = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", () => {
    evaluateData(searchBar.value.trim());
});

function evaluateData(character) {
    switch (character) {
        case "Tanjiro Kamado":
            console.log("Tanjiro Kamado");
            checkCharacter("Tanjiro Kamado");
            document.querySelector(".profile-img img").src = `/DemonSlayer/Tanjiro.png`;
            break;
        case "Zenitsu Agatsuma":
            console.log("Zenitsu Agatsuma");
            checkCharacter("Zenitsu Agatsuma");
            document.querySelector(".profile-img img").src = `/DemonSlayer/Zenitsu-PNG.png`;
            break;
        case "Inosuke Hashibira":
            console.log("Inosuke Hashibira");
            checkCharacter("Inosuke Hashibira");
            document.querySelector(".profile-img img").src = `/DemonSlayer/Insouke.png`;
            break;
        case "Kanao Tsuyuri":
            console.log("Kanao Tsuyuri");
            checkCharacter("Kanao Tsuyuri");
            document.querySelector(".profile-img img").src = `/DemonSlayer/Kanoe.png`;
            break;
        default:
            document.querySelector(".error").style.display = "block";
            document.getElementById("error").innerHTML =character + " is not found in the Database"
            break;
    }
}

async function checkCharacter(character) {
    try {
        const response = await fetch(apiUrl + character);
        if (response.status === 404) {
            document.querySelector(".demon-slayer-profile").style.display = "none";
        } else {
            const data = await response.json();
            console.log(data);
            document.querySelector(".name").innerHTML = data[0].name;
            document.querySelector(".race").innerHTML = data[0].race;

            document.querySelector(".error").style.display = "none";
            document.querySelector(".demon-slayer-profile").style.display = "flex";
        }
    } catch (error) {
        console.error("Error fetching the character data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".demon-slayer-profile").style.display = "none";
    }
}


