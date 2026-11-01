
// Get the recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);

const recipeId = Number(urlParams.get("id"));

console.log("Recipe ID:", recipeId);

// Get the recipe collection
const recipes = window.recipes;

// Find the selected recipe
const recipe = recipes.find(function(item) {
    return item.id === recipeId;
});

// Get the HTML section
const recipeDetails = document.getElementById("recipeDetails");

// Display the recipe
if (recipe) {

    recipeDetails.innerHTML = `

        <div class="intro-box">

            <h2>${recipe.name}</h2>

            <img src="${recipe.image}" 
                 alt="${recipe.name}"
                 style="width:100%; max-width:500px; height:auto;">

            <p><strong>Category:</strong> ${recipe.categoryName}</p>

            <p><strong>Preparation Time:</strong> ${recipe.preparationTime}</p>

            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>

        </div>

        <div class="aboutText">

            <h2>Ingredients</h2>

            <ul>
                ${recipe.ingredients.map(function(ingredient) {
                    return `<li>${ingredient}</li>`;
                }).join("")}
            </ul>

        </div>

        <div class="aboutText">

            <h2>Instructions</h2>

            <ol>
                ${recipe.instructions.map(function(step) {
                    return `<li>${step}</li>`;
                }).join("")}
            </ol>

        </div>

        <div class="intro-box">

            <h2>Serving Suggestion</h2>

            <p>${recipe.servingSuggestion}</p>

        </div>

    `;

} else {

    recipeDetails.innerHTML = "<h2>Sorry, recipe not found!</h2>";

}
// ---------- Favourites ----------
const FAV_KEY = "recipeLounge_favourites";

function getFavourites() {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveFavourites(ids) {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

const favBtn = document.getElementById("fav-btn");
const favMessage = document.getElementById("fav-message");

function updateFavButton() {
    const saved = getFavourites().includes(recipeId);
    favBtn.textContent = saved ? "♥ Saved to Favourites" : "♡ Save to Favourites";
    favBtn.setAttribute("aria-pressed", saved);
}

if (recipe) {
    favBtn.addEventListener("click", function() {
        let favs = getFavourites();

        if (favs.includes(recipeId)) {
            favs = favs.filter(function(id) {
                return id !== recipeId;
            });
            favMessage.textContent = "Removed from your favourites.";
        } else {
            favs.push(recipeId);
            favMessage.textContent = "Saved to your favourites!";
        }

        saveFavourites(favs);
        updateFavButton();
    });

    updateFavButton();
} else {
    // No valid recipe, so hide the save button
    favBtn.hidden = true;
}