const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const cors = require('cors');
const key = process.env.MASHAPE_KEY;

app.use(cors());


// Random Recipe
app.get('/random', (req, res) => {
	console.log(key);
	const request = new Request('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random', {
		'X-Mashape-Key': key,
		'Content-Type': 'Application/json',
		'Accept': 'Application/json'
	});
	fetch(request)
	.then( (response) => {
		return response.json();
	})
	.then( (data) => {
		return res.json(data);
	})
	.catch( (err) =>{
		return res.json(err);
	});
})

// Recipe Details
app.get('/recipe/:id', (req, res) => {
	let id = req.params.id;
	const request = new Request('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information', {
		'X-Mashape-Key': key,
		'Accept': 'Application/json'
	});
	fetch(request)
	.then( (response) => {
		return response.json();
	})
	.then( (data) => {
		return res.json(data);
	})
	.catch( (err) => {
		return res.json(err);
	});
})

app.listen(process.env.PORT || 8080)
