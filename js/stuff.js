window.onload = function() {
	var colorData = getData('js/color.json');
	colorData(changeColors);
};


function getData(url) {
  return function(dataFunc) {
		$.ajax({
			dataType: "json",
			url: url,
			success: function(data) {
				console.log(data);
				dataFunc(data);
			}
		});
	};
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



function changeColors(jsonColors){
	console.log('changing colors');
  var colors = jsonColors['colors'];	
	if (colors) {
    randIndex = Math.floor(Math.random() * colors.length);
		console.log('choosing color scheme', randIndex);
		var colorScheme = colors[randIndex];

		var background = colorScheme["background"];
		var dark       = colorScheme["dark"];
		var accentLight= colorScheme["accentLight"];
		var accentDark = colorScheme["accentDark"];
		var highlight  = colorScheme["highlight"];

		$('.highlight').css('border-bottom', '5px solid ' + highlight);
		$('.date').css('background-color', accentLight);
		$('.position').css('background-color', highlight);
		$('.entry').css('border-bottom', '1px dotted ' + dark);
		$('p .highlight').css('border-bottom', '2px solid ' + highlight);
		$('.jokes').css('background-color ', accentDark);

		$('#current .highlight').css('border-color', dark);
		$('.a').css('border-bottom', '4px solid ' + accentLight);

		$('a').hover(
			function() { 
				$(this).css('background-color', accentDark);
				$(this).css('color', accentLight);
			}, 
			function() {
				$(this).css('background-color', 'transparent');
				$(this).css('color', 'black');
			}
		);

	}
}
