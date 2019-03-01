$('#mRModal').on('show.bs.modal', function(event) {
	var RecTitle = $(event.relatedTarget).attr('data-title');
	var recUrl = $(event.relatedTarget).attr('data-url');
	//alert(recUrl);
	var modal = $(this);
	modal.find('.modal-title').text(RecTitle);
	document.querySelector("audio").src = recUrl;
})