require('newrelic');
const express = require('express');
const compression = require('compression');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 3600 });

const app = express();
const port = 3000;
const imagesIP = '3.101.55.156:3006';
const shoppingIP = '13.52.16.25:3004';
// service before adding Nginx
//const reviewsIP = '54.176.185.40:3002';
const reviewsIP = '50.18.230.50:3002';
const sellerIP = '18.221.203.49:3005';


app.use(compression());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/serviceBundles', (req, res) => {
	let images = axios.get(`http://${imagesIP}/items/1/bundle.js`);
	let shopping = axios.get(`http://${shoppingIP}/items/1/bundle.js`);
	let reviews = axios.get(`http://${reviewsIP}/items/1/bundle.js`);
	let seller = axios.get(`http://${sellerIP}/items/1/bundle.js`);

	// ****add images service bundle when ready to promise
	Promise.all([images,shopping, reviews, seller])
		.then((response) => {
			let data = '';
			response.forEach((resp) => {
				data += resp.data;
			});
			res.status(200).send(data);
		})
		.catch((err) => {
			console.log("could not load ", err);
		});
});

// GET IMAGES DATA
app.get('/items/:item_id/images', (req, res) => {
	let item_id = req.params.item_id;
	axios
		.get(`http://${imagesIP}/items/${item_id}/images`)
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
	// get from cache. if not in cache send axios request
	// key it itemId and the reviews are the value
	let value = myCache.get(itemId);
	if (value == undefined) {
		axios
			.get(`http://${reviewsIP}/api/items/${itemId}/reviews`)
			.then((response) => {
				// set in cache
				myCache.set(itemId, response.data);
				res.status(200).send(response.data);
			})
			.catch((err) => {
				//console.log(err);
				res.status('404');
			});
	} else {
		res.status(200).send(value);
	}
});

app.get('/stats', (req, res) => {
	res.status(200).send(myCache.getStats());
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

app.use('/items/:itemId', express.static('client'));
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Listening at http://localhost:${port}`);
});