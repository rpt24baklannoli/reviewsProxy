const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/items/:itemId', express.static('client'));

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at http://localhost:${port}`);
});

app.get('/serviceBundles', (req, res) => {
	let images = axios.get('http://localhost:3006/items/1/bundle.js');
	let shopping = axios.get('http://localhost:3004/items/1/bundle.js');
	let reviews = axios.get('http://localhost:3002/items/1/bundle.js');
	let seller = axios.get('http://localhost:3005/items/1/bundle.js');

	// ****add images service bundle when ready to promise
	Promise.all([images, shopping, reviews, seller])
		.then((response) => {
			let data = '';
			response.forEach((resp) => {
				data += resp.data;
			});
			res.status(200).send(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

// GET IMAGES DATA
app.get('/item/:item_id/images', (req, res) => {
	let item_id = req.params.item_id;
	axios
		.get(`http://localhost:3006/item/${item_id}/images`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.status('404');
		});
});

// GET SHOPPING DATA
app.get('/shopping/items/:item_id', (req, res) => {
	let item_id = req.params.item_id;
	axios
		.get(`http://localhost:3004/shopping/items/${item_id}`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.status('404');
		});
});

// GET REVIEWS DATA
app.get('/api/items/:itemId/reviews', (req, res) => {
	let itemId = req.params.itemId;
	axios
		.get(`http://http://localhost:3002/api/items/${itemId}/reviews`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.status('404');
		});
});

// GET SELLER DATA
app.get('/items/:item_id/seller', (req, res) => {
	let item_id = req.params.item_id;
	axios
		.get(`http://localhost:3005/items/${item_id}/seller`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.status('404');
		});
});

app.get('/shopping/items', (req, res) => {
	axios
		.get('http://localhost:3004/shopping/items')
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status('404');
		});
});

app.get('/item/images/distinct', (req, res) => {
	axios
		.get('http://localhost:3006/item/images/distinct')
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status('404');
		});
});
