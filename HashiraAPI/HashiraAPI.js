const apiUrl = "https://demon-slayer-api.onrender.com/v1/";

const searchBar = document.querySelector("#hashira-input");
const searchBtn = document.querySelector(".hashira-search button");

searchBtn.addEventListener("click", () => {
    evaluateData(searchBar.value.trim());
});

function evaluateData(character) {
    switch (character) {
        case "Giyu Tomioka":
            console.log("Giyu Tomioka");
            checkHashiraCharacter("Giyu Tomioka");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/giyu.png`;
            break;
        case "Mitsuri Kanroji":
            console.log("Mitsuri Kanroji");
            checkHashiraCharacter("Mitsuri Kanroji");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/mitsuri.png`;
            break;
        case "Obanai Iguro":
            console.log("Obanai Iguro");
            checkHashiraCharacter("Obanai Iguro");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Obanai.png`;
            break;
        case "Sanemi Shinazugawa":
            console.log("Sanemi Shinazugawa");
            checkHashiraCharacter("Sanemi Shinazugawa");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Sanemi Shinazugawa.png`;
            break;
        case "Gyomei Himejima":
            console.log("Gyomei Himejima");
            checkHashiraCharacter("Gyomei Himejima");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Gyomei Himejima.png`;
            break;
        case "Muichiro Tokito":
            console.log("Muichiro Tokito");
            checkHashiraCharacter("Muichiro Tokito");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Muichiro Tokito.png`;
            break;
        case "Shinobu Kocho":
            console.log("Shinobu Kocho");
            checkHashiraCharacter("Shinobu Kocho");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Shinobu Kocho.png`;
            break;
        case "Kyojuro Rengoku":
            console.log("Kyojuro Rengoku");
            checkHashiraCharacter("Kyojuro Rengoku");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Kyojuro Rengoku.png`;
            break;
        case "Kanae Kocho":
            console.log("Kanae Kocho");
            checkHashiraCharacter("Kanae Kocho");
            document.querySelector(".hashira-profile-img img").src = `/HashiraAPI/Kanae Kocho.png`;
            break;        
        default:
            document.querySelector(".hashira-error").style.display = "block";
            document.getElementById("hashira-error").innerHTML = character + " is not found in the Database";
            break;
    }
}

async function checkHashiraCharacter(character) {
    try {
        document.querySelector(".hashira-loading-spinner").style.display = "block";
        document.querySelector(".hashira-profile").style.display = "none";
        
        const response = await fetch(apiUrl + character);
        
        if (response.status === 404) {
            document.querySelector(".hashira-loading-spinner").style.display = "none";
            document.querySelector(".hashira-profile").style.display = "none";
            document.querySelector(".hashira-error").style.display = "block";
        } else {
            const data = await response.json();
            console.log(data);
            document.querySelector(".hashira-name").innerHTML = data[0].name;
            document.querySelector(".hashira-age").innerHTML = data[0].age;
            document.querySelector(".hashira-gender").innerHTML = data[0].gender;
            document.querySelector(".hashira-race").innerHTML = data[0].race;
            document.querySelector(".hashira-birthday").innerHTML = data[0].birthday;
            document.querySelector(".hashira-affiliation").innerHTML = data[0].affiliation;
            document.querySelector(".hashira-occupation").innerHTML = data[0].occupation;
            document.querySelector(".hashira-combat-style").innerHTML = data[0]["combat style"];
            document.querySelector(".hashira-status").innerHTML = data[0].status;
            document.querySelector(".hashira-relatives").innerHTML = data[0]["relative(s)"];
            
            document.querySelector(".hashira-error").style.display = "none";
            document.querySelector(".hashira-profile").style.display = "flex";
        }
    } catch (error) {
        console.error("Error fetching the character data:", error);
        document.querySelector(".hashira-error").style.display = "block";
        document.querySelector(".hashira-profile").style.display = "none";
    } finally {
        document.querySelector(".hashira-loading-spinner").style.display = "none";
    }
}
