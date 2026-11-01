const FAV_KEY = "recipeLounge_favourites";

const grid = document.getElementById("fav-grid");
const count = document.getElementById("fav-count");
const emptyBox = document.getElementById("fav-empty");
const emptyText = document.getElementById("fav-empty-text");
const searchInput = document.getElementById("fav-search");

function getFavourites() {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function renderFavourites() {
    const ids = getFavourites();
    const query = searchInput.value.trim().toLowerCase();

    // Turn saved IDs into full recipe objects
    const favRecipes = ids
        .map(function(id) {
            return window.recipes.find(function(r) { return r.id === id; });
        })
        .filter(Boolean); // drops any IDs that no longer exist

    // Apply the search filter
    const matches = favRecipes.filter(function(r) {
        return r.name.toLowerCase().includes(query);
    });

    grid.innerHTML = "";

    if (matches.length === 0) {
        emptyBox.hidden = false;
        count.textContent = "";
        emptyText.textContent = favRecipes.length === 0
            ? "You haven't saved any recipes yet."
            : "No favourites match your search.";
        return;
    }

    emptyBox.hidden = true;
    count.textContent = matches.length + (matches.length === 1 ? " recipe" : " recipes");

    matches.forEach(function(r) {
        const card = document.createElement("li");
        card.className = "recipe-card";
        card.innerHTML = `
            <a href="recipeDetails.html?id=${r.id}">
                <img src="${r.image}" alt="${r.name}">
                <h4>${r.name}</h4>
            </a>
            <p>${r.categoryName} · ${r.preparationTime} · ${r.difficulty}</p>
            <button type="button" class="remove-btn" data-id="${r.id}">Remove</button>
        `;
        grid.appendChild(card);
    });
}

// Remove buttons (event delegation)
grid.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-btn")) {
        const id = Number(e.target.dataset.id);
        const favs = getFavourites().filter(function(favId) {
            return favId !== id;
        });
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
        renderFavourites();
    }
});

// Live search
searchInput.addEventListener("input", renderFavourites);

renderFavourites();