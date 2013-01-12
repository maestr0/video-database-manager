var self = this;

console.log("Media Database Manager javasrcript ....");

var fnStartApp = function() {
		fnBind();
		fnLoadMediaFromLocalStorage();
	};


var fnLoadMediaFromLocalStorage = function() {

	};

var fnBind = function() {
		$("#testButton").click(function() {
			fnFindMediaInfo("Gladiator");
		});
	};

var fnAddMedia = function(media, media_id) {
		fnAddMediaToUI(media);
		fnSaveMediaToLocalStorage(media, media_id);
	};

var fnSaveMediaToLocalStorage = function(media_id, data) {
		console.log("Saving media to LocalStorage...", media);
	}
var fnAddMediaToUI = function(media) {
		console.log("Adding media to UI...", media);
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
				console.log("Something went wrong ;(. IMDB API error", data);
				// TODO: error handeling 
			}
		});
	};

fnStartApp();