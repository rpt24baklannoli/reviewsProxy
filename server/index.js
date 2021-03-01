require('newrelic');
const express = require('express');
const compression = require('compression');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
const imagesIP = '13.52.213.118:3006';
const shoppingIP = '18.222.223.190:3004';
const reviewsIP = 'localhost:3002';
const sellerIP = '3.21.248.149:3005';

app.use(compression());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/items/:itemId', express.static('client'));

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at http://localhost:${port}`);
});

app.get('/serviceBundles', (req, res) => {
	//let images = axios.get(`http://${imagesIP}/items/1/bundle.js`);
	//let shopping = axios.get(`http://${shoppingIP}/items/1/bundle.js`);
	let reviews = axios.get(`http://${reviewsIP}/items/1/bundle.js`);
	//let seller = axios.get(`http://${sellerIP}/items/1/bundle.js`);

	// ****add images service bundle when ready to promise
	Promise.all([/*images, shopping,*/ reviews /*seller*/])
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
		.get(`http://${imagesIP}/item/${item_id}/images`)
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
		.get(`http://${shoppingIP}/shopping/items/${item_id}`)
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
		.get(`http://${reviewsIP}/api/items/${itemId}/reviews`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			//console.log(err);
			res.status('404');
		});
});

// POST REVIEWS DATA
app.post(`/api/items/:itemId/reviews`, (req, res) => {
  let itemId = req.params.itemId;
	let review = req.body;
	axios
		.post(`http://${reviewsIP}/api/items/${itemId}/reviews`, review)
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
		.get(`http://${sellerIP}/items/${item_id}/seller`)
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
		.get(`http://${shoppingIP}/shopping/items`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status('404');
		});
});

app.get('/item/images', (req, res) => {
	axios
		.get(`http://${imagesIP}/item/images`)
		.then((response) => {
			res.status(200).send(response.data);
		})
		.catch((err) => {
			res.status('404');
		});
});
