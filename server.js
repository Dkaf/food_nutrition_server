const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const cors = require('cors')

app.use(cors());


// Random Recipe
app.get('/random', (req, res) => {
	let key = process.env.MASHAPE_KEY
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
		return err;
	});
})

app.listen(process.env.PORT || 8080)
