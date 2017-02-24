const express = require('express');
const unirest = require('unirest');
const app = express();
const cors = require('cors');
const key = process.env.MASHAPE_KEY;

app.use(cors());


// Random Recipe
app.get('/random', (req, res) => {
	console.log(key);
	unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random')
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		let resultArr = [results.body.recipes]
		unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random')
		.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
		.end( (data) => {
			resultArr.push(data.body.recipes)
			resultArr.forEach( (i) => {
				unirest.get('https://hidden-stream-82621.herokuapp.com/recipe/' + i.id)
				.end( (data) => {
					i.push(data);
				});
			});
			return res.json(resultArr);
		});
	});
});

// Recipe Details
app.get('/recipe/:id', (req, res) => {
	let id = req.params.id;
	unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information?includeNutrition=true')
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		return res.json(results.body.nutrition.nutrients);
	});
});


// Recipe Autocomplete Search
app.get('/recipesearch/:query', (req, res) => {
	let query = req.params.query;
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=1&query=" + query)
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		let originalSearch = res.json(results.body[0].id)
		unirest.get('https://hidden-stream-82621.herokuapp.com/similarRecipes/' + originalSearch)
		.end( (data) => {
			return res.json(data);
		})
	});
});

// Similar recipes
app.get('/similarRecipes/:id', (req, res) => {
	let id = req.params.id;
	unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/similar')
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		return res.json(results);
	});
});



app.listen(process.env.PORT || 8080)
