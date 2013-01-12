var self = this;

console.log("Media Database Manager javasrcript ....");

var fnStartApp = function(){
	fnBind();
	fnLoadMediaFromLocalStorage();
};


var fnLoadMoviesFromLocalStorage = function(){

};

var fnBind = function(){

};

var fnAddMedia = function(media,media_id){
	fnAddMediaToUI(media);
	fnSaveMediaToLocalStorage(media,media_id);
};

var fnAddMediaToUI = function(media){

};

var fnFindMediaInfo = function(title){
	var url = 'http://www.imdbapi.com/?t='+title;
	fnCallAPI(url);
};

var fnCallAPI = function(url){
	$.getJSON(url, function(data){
		if (data.Response!="Parse Error"){
			fnAddMedia(data);						
		} else {
			// TODO: error handeling 
		}
    });
};

fnStartApp();