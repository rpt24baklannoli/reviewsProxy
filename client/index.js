let fetsyImageURL = document.getElementById('fetsy-image');
let fetsyShoppingURL = document.getElementById('fetsy-shopping');
let fetsyReviewsURL = document.getElementById('fetsy-reviews');
let fetsySellerURL = document.getElementById('fetsy-seller');

let itemID = window.location.href.slice(-2, -1);

let imageID = fetsyImageURL.src.slice(-1);
let shoppingID = fetsyShoppingURL.src.slice(-1);
let reviewsID = fetsyReviewsURL.src.slice(-1);
let sellerID = fetsySellerURL.src.slice(-1);

const updateSrc = function (port) {
	if (port === 3002) {
		fetsyReviewsURL.src = `http://localhost:${port}/items/${itemID}`;
	}
	if (port === 3004) {
		fetsyShoppingURL.src = `http://localhost:${port}/items/${itemID}`;
	}
	if (port === 3005) {
		fetsySellerURL.src = `http://localhost:${port}/items/${itemID}`;
	}
	if (port === 3006) {
		fetsyImageURL.src = `http://localhost:${port}/items/${itemID}`;
	}
};

if (itemID !== imageID || itemID !== shoppingID || itemID !== reviewsID || itemID !== sellerID) {
	updateSrc(3002);
	updateSrc(3004);
	updateSrc(3005);
	updateSrc(3006);
}
