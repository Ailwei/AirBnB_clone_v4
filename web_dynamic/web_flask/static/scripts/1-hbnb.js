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
});
