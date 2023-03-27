function initGoogleReviewsWidget(containerId, apiKey, placeId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=reviews&key=' + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var reviews = data.result.reviews;

            if (!reviews || !reviews.length) {
                container.innerHTML = 'Нет отзывов';
                return;
            }

            var reviewsHtml = reviews.map(function(review) {
                return '<div class="review">' +
                    '<div class="review-author">' + review.author_name + '</div>' +
                    '<div class="review-rating">' + review.rating + '</div>' +
                    '<div class="review-text">' + review.text + '</div>' +
                    '</div>';
            }).join('');

            container.innerHTML = reviewsHtml;
        })
        .catch(function(error) {
            console.error('Ошибка при получении отзывов:', error);
            container.innerHTML = 'Ошибка при загрузке отзывов';
        });
}