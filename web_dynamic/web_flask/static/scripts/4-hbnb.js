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
		$.getJSON('https:0.0.0.0:5001/api/v1/status/', function(data) {
			if (data.status === 'OK') {
				$('#api_status').addClass('addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}

			checkAPIStatus();
});
		 function requestPlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function(data) {
                
                $.each(data, function(index, place) {
                    var article = $('<article>');
                    article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>');
                    article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                });
            }
		 $('button').click(function() {
        // Get the list of checked amenities
        var amenities = [];
        $('input[type="checkbox"]:checked').each(function() {
            amenities.push($(this).data('id'));

        });
    }
    requestPlaces(ameninties);
});
});
