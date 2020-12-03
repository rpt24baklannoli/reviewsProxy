let fetsyReviewsURL = document.getElementById('fetsy-reviews');
let itemID = window.location.href.slice(-2, -1);
let reviewsID = fetsyReviewsURL.src.slice(-1);
const updateSrc = function (port) {
	fetsyReviewsURL.src = `http://localhost:${port}/items/${itemID}`;
};

if (itemID !== reviewsID) {
	updateSrc(3002);
}

console.log(itemID, reviewsID, fetsyReviewsURL);
