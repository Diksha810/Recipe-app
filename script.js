const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


//function to get recipes
async function fetchRecipes(query) {
    try {
        const response = await fetch(apiUrl + query + `&appid=${query}`);
        var data = await response.json();
        recipeContainer.innerHTML = "";
        data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
       <img src="${meal.strMealThumb}"> 
<h3>${meal.strMeal}</h3>
<p><span>${meal.strArea}</span>Dish</p>
<p>Belongs to <span>${meal.strCategory}</span> Category</p>

       `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            //adding EventListener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);

            });




            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes</h2>"
    }
}


//function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure}${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
<h2 class="recipeName">${meal.strMeal}</h2>
<h3 class="ingredientheading">Ingredients:</h3>
<ul class="ingredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions:</h3>
<p >${meal.strInstructions}</p>
</div>
`

    recipeDetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener('click', (e) => {
    recipeDetailsContent.parentElement.style.display = "none";
});






searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetchRecipes(searchBox.value);

});