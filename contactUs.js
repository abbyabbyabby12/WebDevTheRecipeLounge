
const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("response").textContent =
        "Thank you for contacting The Recipe Lounge!";

    form.reset();
});
