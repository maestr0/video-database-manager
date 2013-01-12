var self = this;

console.log("Media Database Manager javasrcript ....")

var fnStartApp = function(){
	fnBind();
	fnLoadMediaFromLocalStorage();
}


var fnLoadMoviesFromLocalStorage = function(){

}

var fnBind = function(){

}

var fnAddMediaToUI = function(media){

}

var fnFindMediaInfo = function(title){
	// get list of files
	var url = 'http://www.imdbapi.com/?t='+title;
	// foreach

	fnCallAPI(url);
	// save
	fnAddVideoToUI(media)

	
}

var fnAddVideoToUI = function(url){
	$.getJSON(url, function(data){
		if (data["Response"]!="Parse Error"){
			self.addRowToTable(data,filename);
			
			if(previousFilename){
				filename = previousFilename;
			}
			
			movies.push(filename);
			if(hasStorage){
				localStorage.setItem(filename, JSON.stringify(data));
			}
			
		} else {
			var error = $('<div class="alert-message error hide fade in" data-alert="alert">\
				<a class="close" href="#">&times;</a><p>Oh snap! Info for <strong>'+filename+'</strong> couldn\'t be found.</p>\
				<a class="edit" href="#"  onclick="editAndSearchAgain(\'' + filename+ '\',this);">Correct title and search again</a>\
				</div>');
            error.appendTo('#message-box');
            error.fadeIn();
		}
    });
}

fnStartApp();