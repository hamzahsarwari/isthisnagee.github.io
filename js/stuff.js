window.onload = function() {
	getData("http://159.203.47.33:3000/lastfm/isthisnagee/lastplayed");
};


function getData(url) {
  $.ajax({
		dataType: "json",
		url: url,
		success: function(data) {
			updateLastFm(data);
		}
	});
}

function updateLastFm(lastfm) {
	// get jqeury stuff
	var albumTextDiv = $('#album-text');
	var albumArtDiv = $('#album-art');

  var albumName = lastfm['album']['#text'];
	var songName = lastfm['name'];
	var artistName = lastfm['artist']['#text'];
  var albumArtLink = lastfm['image'][0]; 	
	console.log('albumArtLink', albumArtLink);

	var albumNameText = albumName 
		? '<span id="album-name">' + albumName + '</span>' 
		: '';
	var songNameText = songName
	  ? '<span id="song-name">' + songName + '</span>'
	  : '';
	var artistNameText = artistName
	  ? '<span id="arist-name">' + artistName + '</span>'
	  : '';
	var albumArtUrl = albumArtLink
	  ? '<img src="' + albumArtLink['#text'] + '" alt="album cover" />'
    : '';	

  var albumText = songNameText && albumNameText && artistNameText 
		? albumText = artistNameText + ':' + songNameText + ',' + albumNameText
	  : albumText = artistNameText + ':' + songNameText;

	// put in html
	albumTextDiv.replaceWith(albumText);
	albumArtDiv.replaceWith(albumArtUrl);

}
