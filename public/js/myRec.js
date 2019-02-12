$('#mRModal').on('show.bs.modal', function(event) {
	var RecTitle = $(event.relatedTarget).attr('data-title');
	var modal = $(this);
	modal.find('.modal-title').text(RecTitle);
})