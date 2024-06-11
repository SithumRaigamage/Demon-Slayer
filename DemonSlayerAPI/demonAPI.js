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
            document.querySelector(".profile-img img").src = `/DemonSlayerAPI/Tanjiro.png`;
            break;
        case "Zenitsu Agatsuma":
            console.log("Zenitsu Agatsuma");
            checkCharacter("Zenitsu Agatsuma");
            document.querySelector(".profile-img img").src = `/DemonSlayerAPI/Zenitsu-PNG.png`;
            break;
        case "Inosuke Hashibira":
            console.log("Inosuke Hashibira");
            checkCharacter("Inosuke Hashibira");
            document.querySelector(".profile-img img").src = `/DemonSlayerAPI/Insouke.png`;
            break;
        default:
            document.querySelector(".error").style.display = "block";
            document.getElementById("error").innerHTML =character + " is not found in the Database"
            break;
    }
}

async function checkCharacter(character) {
    try {
        // Show the loading spinner
        document.querySelector(".loading-spinner").style.display = "block";
        document.querySelector(".demon-slayer-profile").style.display = "none";
        
        const response = await fetch(apiUrl + character);
        
        if (response.status === 404) {
            document.querySelector(".loading-spinner").style.display = "none";
            document.querySelector(".demon-slayer-profile").style.display = "none";
            document.querySelector(".error").style.display = "block";
        } else {
            const data = await response.json();
            console.log(data);
            document.querySelector(".name").innerHTML = data[0].name;
            document.querySelector(".age").innerHTML = data[0].age;
            document.querySelector(".gender").innerHTML = data[0].gender;
            document.querySelector(".race").innerHTML = data[0].race;
            document.querySelector(".birthday").innerHTML = data[0].birthday;
            document.querySelector(".affiliation").innerHTML = data[0].affiliation;            
            document.querySelector(".occupation").innerHTML = data[0].occupation;
            document.querySelector(".combat-style").innerHTML = data[0]["combat style"];
            document.querySelector(".partner").innerHTML = data[0]["partner(s)"];
            document.querySelector(".status").innerHTML = data[0].status;
            document.querySelector(".relatives").innerHTML = data[0]["relative(s)"];
            
            document.querySelector(".error").style.display = "none";
            document.querySelector(".demon-slayer-profile").style.display = "flex";
        }
    } catch (error) {
        console.error("Error fetching the character data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".demon-slayer-profile").style.display = "none";
    } finally {
        // Hide the loading spinner
        document.querySelector(".loading-spinner").style.display = "none";
    }
}



