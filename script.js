/**
 * Created by golrizp on 10/30/14.
 */
$(document).ready(function() {
	var numPages = $('a[data-ga-category=Pagination]').eq(-2).text();
	var currentPage = parseInt($('.selected').text());
	var getUrl = window.location.href.split('?')[0].split('page:')[0];
	if (getUrl.substr(-1) === "/") {
		getUrl += "page:";
	}
	else {
		getUrl += "/page:";
	}
	for (var i = currentPage + 1; i <= numPages; i++) {
		$.ajax({
			type: 'get',
			async: false,
			url: getUrl + i,
			success: function (result) {
				postToCH(result, i);
			},
		});
		if(i==numPages){
			final();
		}
	}
	function postToCH(content, num) {
		console.log(num);
		var $data = $(content);
		$data.find('#comments').remove();
		$data.find('.pagination').remove();
		$data = $data.find('.post-content').html();
		$('.primary').append("<div id='ch1-"+num+"'>"+$data+"</div>");
		$('#ch1-'+num).each(function (i) {
			var ids = $('[id="' + this.id + '"]');
			if (ids.length > 1) $('[id="' + this.id + '"]:gt(0)').remove();
		});
	}
	function final(){
		$('.pagination').remove();
		var comments = $('#comments').html();
		$('#comments').remove();
		$('.content').after(comments);
	}
});