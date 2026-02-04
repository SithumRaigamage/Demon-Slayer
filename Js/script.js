// ==========================================
// Demon Slayer - Enhanced Script
// ==========================================

let characterList = [];
let filteredCharacters = [];
let currentPage = 1;
const itemsPerPage = 6;

// Use CORS proxy to avoid CORS issues when opening from file://
const corsProxy = "https://corsproxy.io/?";
const baseApiUrl = "https://www.demonslayer-api.com/api/v1";
const apiUrl = corsProxy + encodeURIComponent(baseApiUrl + "/characters?limit=45&page=1");

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for search optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Show loading overlay
function showLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.classList.add('active');
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.classList.remove('active');
}

// Show skeleton loading for characters
function showSkeletonLoading() {
  const container = document.querySelector("#characterGrid");
  if (!container) return;
  
  container.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    container.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="skeleton skeleton-card mt-4"></div>
      </div>
    `;
  }
}

// ==========================================
// Scroll Effects
// ==========================================

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.ezy__nav4');
  if (!navbar) return;
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Scroll to top button visibility
function handleScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;
  
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
}

// Initialize scroll to top functionality
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// Character Functions
// ==========================================

const fetchCharacters = async () => {
  try {
    showSkeletonLoading();
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    characterList = await response.json();
    filteredCharacters = characterList.content || [];
    
    renderCharacters();
    setupPagination();
    setupFilters();
  } catch (error) {
    console.error("Error fetching characters:", error);
    showErrorMessage("Failed to load characters. Please try again later.");
  }
};

function showErrorMessage(message) {
  const container = document.querySelector("#characterGrid");
  if (!container) return;
  
  container.innerHTML = `
    <div class="col-12 text-center text-white mt-5">
      <div class="error-message">
        <i class="fas fa-exclamation-circle fa-3x mb-3" style="color: #FF5733;"></i>
        <h4>${message}</h4>
        <button class="btn btn-outline-light mt-3" onclick="fetchCharacters()">
          <i class="fas fa-redo me-2"></i>Retry
        </button>
      </div>
    </div>
  `;
}

function renderCharacters(page = 1) {
  const charactersContainer = document.querySelector("#characterGrid");
  if (!charactersContainer) return;
  
  charactersContainer.innerHTML = "";
  currentPage = page;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const charactersToShow = filteredCharacters.slice(start, end);

  if (charactersToShow.length === 0) {
    charactersContainer.innerHTML = `
      <div class="col-12 text-center text-white mt-5">
        <i class="fas fa-search fa-3x mb-3" style="opacity: 0.5;"></i>
        <h4>No characters found</h4>
        <p class="opacity-75">Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }

  charactersToShow.forEach((character, index) => {
    const characterDiv = document.createElement("div");
    characterDiv.className = "col-md-6 col-lg-4";
    characterDiv.dataset.aos = 'fade-up';
    characterDiv.dataset.aosDelay = (index * 100).toString();
    
    characterDiv.innerHTML = `
      <div class="characters-item position-relative mt-4" onclick="showCharacterDetails('${encodeURIComponent(JSON.stringify(character))}')">
        <img 
          src="${character.img}" 
          alt="${character.name}" 
          class="img-fluid w-100 characters-img" 
          loading="lazy"
          onerror="this.src='Pictures/logo.png'; this.style.objectFit='contain'; this.style.padding='20px';" 
        />
        <div class="characters-content text-center py-4">
          <h5>${character.name}</h5>
          <p class="mb-0 race-badge">${character.race}</p>
        </div>
        <div class="character-overlay">
          <span class="view-details">View Details <i class="fas fa-arrow-right ms-2"></i></span>
        </div>
      </div>
    `;
    charactersContainer.appendChild(characterDiv);
  });
  
  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

function showCharacterDetails(encodedCharacter) {
  const character = JSON.parse(decodeURIComponent(encodedCharacter));
  const modalBody = document.getElementById('modalBody');
  const modalLabel = document.getElementById('characterModalLabel');
  
  if (!modalBody || !modalLabel) return;
  
  modalLabel.textContent = character.name;
  
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-5 mb-4 mb-md-0">
        <img src="${character.img}" alt="${character.name}" class="img-fluid rounded" 
          onerror="this.src='Pictures/logo.png';" />
      </div>
      <div class="col-md-7">
        <div class="character-details">
          <div class="detail-item mb-3">
            <span class="detail-label"><i class="fas fa-user me-2"></i>Race</span>
            <span class="detail-value badge bg-danger">${character.race}</span>
          </div>
          ${character.gender ? `
          <div class="detail-item mb-3">
            <span class="detail-label"><i class="fas fa-venus-mars me-2"></i>Gender</span>
            <span class="detail-value">${character.gender}</span>
          </div>
          ` : ''}
          ${character.affiliation ? `
          <div class="detail-item mb-3">
            <span class="detail-label"><i class="fas fa-users me-2"></i>Affiliation</span>
            <span class="detail-value">${character.affiliation}</span>
          </div>
          ` : ''}
          ${character.description ? `
          <div class="detail-item mt-4">
            <span class="detail-label"><i class="fas fa-info-circle me-2"></i>Description</span>
            <p class="detail-value mt-2 opacity-75">${character.description}</p>
          </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  const modal = new bootstrap.Modal(document.getElementById('characterModal'));
  modal.show();
}

// ==========================================
// Filter & Search Functions
// ==========================================

function setupFilters() {
  const searchInput = document.getElementById('characterSearch');
  const raceFilter = document.getElementById('raceFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleFilter, 300));
  }
  
  if (raceFilter) {
    raceFilter.addEventListener('change', handleFilter);
  }
}

function handleFilter() {
  const searchTerm = document.getElementById('characterSearch')?.value.toLowerCase() || '';
  const raceValue = document.getElementById('raceFilter')?.value || '';
  
  if (!characterList.content) return;
  
  filteredCharacters = characterList.content.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm);
    const matchesRace = !raceValue || character.race === raceValue;
    return matchesSearch && matchesRace;
  });
  
  currentPage = 1;
  renderCharacters(1);
  updatePaginationUI();
}

// ==========================================
// Pagination Functions
// ==========================================

function setupPagination() {
  const paginationContainer = document.querySelector(".pagination");
  if (!paginationContainer) return;
  
  updatePaginationUI();
}

function updatePaginationUI() {
  const paginationContainer = document.querySelector(".pagination ol");
  if (!paginationContainer) return;
  
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  
  paginationContainer.innerHTML = `
    <li>
      <a href="#" class="pagination__item ${currentPage === 1 ? 'pagination__item--disabled' : ''}" onclick="changePage(${currentPage - 1}); return false;">
        <i class="fas fa-chevron-left"></i>
      </a>
    </li>
    ${generatePageNumbers(totalPages)}
    <li>
      <a href="#" class="pagination__item ${currentPage === totalPages ? 'pagination__item--disabled' : ''}" onclick="changePage(${currentPage + 1}); return false;">
        <i class="fas fa-chevron-right"></i>
      </a>
    </li>
  `;
}

function generatePageNumbers(totalPages) {
  let html = '';
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    html += `
      <li>
        <a href="#" class="pagination__item ${i === currentPage ? 'pagination__item--selected' : ''}" 
           onclick="changePage(${i}); return false;">
          ${i}
        </a>
      </li>
    `;
  }
  
  return html;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  renderCharacters(page);
  updatePaginationUI();
  
  // Scroll to characters section smoothly
  document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// Combat API
// ==========================================

const CombatUrl = corsProxy + encodeURIComponent(baseApiUrl + "/combat-styles?limit=45&page=1");

const fetchCombat = async () => {
  try {
    const response = await fetch(CombatUrl);
    const combatData = await response.json();
    console.log('combatList:', combatData);
  } catch (error) {
    console.error("Error fetching combat styles:", error);
  }
};

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll effects
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleScrollToTop();
  });
  
  // Initialize scroll to top button
  initScrollToTop();
  
  // Fetch data
  fetchCharacters();
  fetchCombat();
  
  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = bootstrap.Modal.getInstance(document.getElementById('characterModal'));
      if (modal) modal.hide();
    }
  });
});
