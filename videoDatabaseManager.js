var self = this;

console.log("Media Database Manager javasrcript ....");

var fnStartApp = function() {
		fnBind();
		fnLoadMediaFromLocalStorage();
	};


var fnLoadMoviesFromLocalStorage = function() {

	};

var fnBind = function() {

	};

var fnAddMedia = function(media, media_id) {
		fnAddMediaToUI(media);
		fnSaveMediaToLocalStorage(media, media_id);
	};

var fnAddMediaToUI = function(media) {

	};

var fnFindMediaInfo = function(mediaFile) {
		// TODO: extract title and year from a file name
		var title = "Gladiator";
		var year = "";

		var url = 'http://www.imdbapi.com/?t=' + title + "&y=" + year;
		fnCallAPI(url);
	};

var fnCallAPI = function(url) {
		$.getJSON(url, function(data) {
			if(data.Response != "Parse Error") {
				fnAddMedia(data);
			} else {
				// TODO: error handeling 
			}
		});
	};

fnStartApp();