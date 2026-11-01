
let drinks = [
    {
        id: 25,
        title: "Aperol Spritz",
        category: "Cocktails",
        image: "images/aperolSpritz.jpg",
        description: "Ingredients: 90 mL Prosecco, 60 mL Aperol, 30 mL soda water, ice, and 1 orange slice. Instructions: Fill a large wine glass with ice. Pour in the Prosecco. Add the Aperol. Top with soda water. Gently stir. Garnish with an orange slice."
    },
    {
        id: 26,
        title: "Lemon and Lime Soda",
        category: "Soft drinks and Sodas",
        image: "images/lemonLimeSoda.jpg",
        description: "Ingredients: 1 lemon, 1 lime, 250 mL soda water, 1-2 teaspoons sugar, and ice. Instructions: Fill a glass with ice. Squeeze the juice from the lemon and lime into the glass. Add the sugar and stir. Pour in the soda water and gently stir. Garnish with a lemon or lime slice."
    },
    {
        id: 27,
        title: "Lavender and Vanilla Latte",
        category: "Coffee",
        image: "images/lavenderVanillaLatte.jpg",
        description: "Ingredients: 1 shot of espresso, 200 mL milk, 1 teaspoon vanilla syrup, 1 teaspoon lavender syrup, and dried lavender for garnish. Instructions: Brew the espresso and pour it into a cup. Add the vanilla and lavender syrup. Steam the milk until warm and frothy, then pour it over the espresso. Stir gently and garnish with dried lavender."
    },
    {
        id: 28,
        title: "Hugo Spritz",
        category: "Cocktails",
        image: "images/hugoSpritz.jpg",
        description: "Ingredients: 90 mL Prosecco, 30 mL elderflower liqueur, 30 mL soda water, fresh mint leaves, 1 lime slice, and ice. Instructions: Fill a large wine glass with ice. Add the elderflower liqueur and Prosecco. Top with soda water. Gently stir. Add fresh mint leaves and a lime slice for garnish."
    }
];

function displayHomeRecipes() {

    const container = document.getElementById("item-container");

    if (!container) return;

    container.innerHTML = "";

    drinks.forEach(drink => {

        let favourites = JSON.parse(
            localStorage.getItem("recipeLounge_favourites") || "[]"
        );

        const isFavourite = favourites.includes(drink.id);

        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <h4>${drink.title}</h4>

            <p>${drink.category}</p>

            <img src="${drink.image}" alt="${drink.title}">

            <button class="favourite-btn">
                ${isFavourite ? "♥ Remove Favourite" : "♡ Add to Favourites"}
            </button>

            <button class="view-recipe-btn">
                View Recipe
            </button>
        `;

        // Favourite button
        card.querySelector(".favourite-btn").addEventListener("click", function() {

            let favs = JSON.parse(
                localStorage.getItem("recipeLounge_favourites") || "[]"
            );

            if (favs.includes(drink.id)) {
                favs = favs.filter(id => id !== drink.id);
            } else {
                favs.push(drink.id);
            }

            localStorage.setItem(
                "recipeLounge_favourites",
                JSON.stringify(favs)
            );

            displayHomeRecipes();
        });

        // View recipe details
        card.querySelector(".view-recipe-btn").addEventListener("click", function() {

            window.location.href = "recipeDetails.html?id=" + drink.id;

        });

        container.appendChild(card);

    });
}

displayHomeRecipes();
