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
