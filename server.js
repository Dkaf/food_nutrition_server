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
		let resultArr = [results]
		unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random')
		.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
		.end( (data) => {
			resultArr.push(data)
			return res.json(resultArr);
		})
	})
})

// Recipe Details
app.get('/recipe/:id', (req, res) => {
	let id = req.params.id;
	unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/')
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		return res.json(resultArr);
	})
})

app.get('/recipesearch/:query', (req, res) => {
	let query = req.params.query;
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?query=" + query)
	.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
	.end( (results) => {
		unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + results.id + '/similar')
		.headers({'X-Mashape-Key': key, 'Accept': 'Application/json', 'Content-Type': 'Application/json'})
		.end( (data) => {
			return res.json(data);
		})
	})
})



app.listen(process.env.PORT || 8080)
