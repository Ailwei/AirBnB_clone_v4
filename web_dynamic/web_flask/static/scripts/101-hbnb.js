$(document).ready(function() {
	const checkedAmenities = {};

	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).parent().data('id');
		const amenityName = $(this).parent().data('name');

		if ($(this).prop('checked')) {
			checkedAmenities[amenityId] = amenityName;
		} else {
			delete checkedAmenities[amenityId];
		}
		const amenitiesList = Object.values(checkedAmenities).join(',');
		$('#amenities-list').text(amenitiesList);
	});
function checkAPIStatus() {
        $.getJSON('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    checkAPIStatus();

    function requestPlaces(amenities, states, cities) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities, states: states, cities: cities }),
            success: function(data) {
                $('.places').empty();
                $.each(data, function(index, place) {
                    var article = $('<article>');
                    article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>');
                    article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                });
            }
        });
    }

    $('button').click(function() {
        var amenities = [];
        $('input[type="checkbox"].amenity:checked').each(function() {
            amenities.push($(this).data('id'));
        });

        var states = [];
        $('input[type="checkbox"].state:checked').each(function() {
            states.push($(this).data('id'));
        });

        var cities = [];
        $('input[type="checkbox"].city:checked').each(function() {
            cities.push($(this).data('id'));
        });

        requestPlaces(amenities, states, cities);
    });

    $('input[type="checkbox"].state, input[type="checkbox"].city').change(function() {
        var checkedLocations = [];
        $('input[type="checkbox"].state:checked, input[type="checkbox"].city:checked').each(function() {
            checkedLocations.push($(this).data('name'));
        });
        $('.locations h4').text(checkedLocations.join(', '));
    });
	function toggleReviews() {
    const toggleSpan = document.getElementById('toggleReviews');
    const reviewsContainer = document.getElementById('reviewsContainer');

    if (toggleSpan.innerText === 'show') {
        fetchReviews().then(reviews => {
            reviewsContainer.innerHTML = '';
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.innerText = review;
                reviewsContainer.appendChild(reviewElement);
            });
        });
        toggleSpan.innerText = 'hide';
    } else {
        reviewsContainer.innerHTML = '';
        toggleSpan.innerText = 'show';
    }
}

async function fetchReviews() {
    return new Promise(resolve => {
        setTimeout(() => {
            const reviews = ['Review 1', 'Review 2', 'Review 3'];
            resolve(reviews);
        }, 1000);
    });
}
