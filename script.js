

var characterList = [];

const apiUrl ="https://www.demonslayer-api.com/api/v1/characters?limit=45&page=1";

const fetchCharacters = async () => {
  try {
    const response = await fetch(apiUrl);
    characterList = await response.json();
    // console.log('data', characterList);
    renderCharacters();
    setupPagination();
  } catch (error) {
    console.log("error", error);
  }
};

function renderCharacters(page = 1) {
  const charactersContainer = document.querySelector("#characters .row");
  charactersContainer.innerHTML = "";

  const itemsPerPage = 6;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const charactersToShow = characterList.content.slice(start, end);

  charactersToShow.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.className = "col-md-6 col-lg-4";
    characterDiv.innerHTML = `
            <div class="characters-item position-relative mt-4">
                <img src="${character.img}" alt="${character.name}" class="img-fluid w-100 characters-img" style="width: 350px; height: 350px;" />
                <div class="characters-content text-center py-4">
                    <h5>${character.name}</h5>
                    <p class="mb-0">${character.race}</p>
                </div>
            </div>
        `;
    charactersContainer.appendChild(characterDiv);
  });
}

function setupPagination() {
  const totalPages = Math.ceil(characterList.content.length / 6);
  const paginationList = document.querySelector(".pagination__list");

  // Add click handlers to prev/next buttons
  const prevButton = paginationList.querySelector("li:first-child a");
  const nextButton = paginationList.querySelector("li:last-child a");

  let currentPage = 1;

  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderCharacters(currentPage);
      updatePaginationState();
    }
  });

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderCharacters(currentPage);
      updatePaginationState();
    }
  });

  // Add click handlers to number buttons
  const numberButtons = paginationList.querySelectorAll(
    'a[aria-label^="Go to page"]'
  );
  numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = parseInt(button.textContent);
      renderCharacters(currentPage);
      updatePaginationState();
    });
  });

  function updatePaginationState() {
    // Update disabled state of prev/next buttons
    prevButton.classList.toggle(
      "pagination__item--disabled",
      currentPage === 1
    );
    nextButton.classList.toggle(
      "pagination__item--disabled",
      currentPage === totalPages
    );

    // Update selected state of number buttons
    numberButtons.forEach((button) => {
      button.classList.toggle(
        "pagination__item--selected",
        parseInt(button.textContent) === currentPage
      );
    });
  }
}

fetchCharacters();
