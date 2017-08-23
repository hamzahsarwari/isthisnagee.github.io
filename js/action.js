/*
 * Takes a json object `lastfm` and adds the data in it to
 * the html
 */
const addSong = lastfm => {
  console.log('lastfm', lastfm);
  const tracks = lastfm.recenttracks.track;
  const latest = tracks[0]
  // get jqeury stuff
  const albumTextDiv = $("#album-text");
  const albumArtDiv = $("#album-art");

  const albumName = latest["album"]["#text"];
  const songName = latest["name"];
  const artistName = latest["artist"]["#text"];
  const albumArtLink = latest["image"][0]["#text"];
  const songLink = latest["url"];

  const music = `
  <a href="${songLink}">
      <div class="dib mw5 black">
        <img class="db w3 h3 ba b--black-10" alt="album cover"
                         src="${albumArtLink}">
        <dl class="mt2 f6 lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 f29 color-text--accent-light">${songName}</dd>
          <dt class="clip">Artist</dt>
          <dd class="ml0 gray color-text">${artistName}</dd>
        </dl>
      </div>
      </a>
  `;
  $("#music").replaceWith(music);
};

/*
 * Takes a url `url`, gets the json data it gives,
 * and returns a function that acts on that data
 */
const getDataFrom = url => {
  return {
    then: dataFunc => {
      $.ajax({
        dataType: "json",
        url: url,
        success: data => {
          dataFunc(data);
        }
      });
    }
  };
};

const loadColors = colors => {
  const makeColor = (color, i) => {
    const bg = color["background"];
    const dark = color["dark"];
    const text = color["text"];
    const accentLight = color["accentLight"];
    const accentDark = color["accentDark"];
    const highlight = color["highlight"];
    return `<div onClick={color(${i})}
                 class="dib w2 bt bb bw2-ns b--black h2 pointer nagee-me"
                 data-bg="${bg}"
                 data-text="${text}"
                 data-dark="${dark}"
                 data-accent-light="${accentLight}"
                 data-accent-dark="${accentDark}"
                 style="background-color: ${bg}"></div>`;
  };

  const defaultColors = `
            <div onClick={color(-1)}
                 class="dib w2 bt bb bw2-ns b--black h2 pointer nagee-me bl"
                 data-bg="white"
                 data-text="black"
                 data-dark="#444"
                 data-accent-light="blue"
                 data-accent-dark="gray"
                 style="background-color: white"></div>`;

  $(".color-list").replaceWith(
    [defaultColors, ...colors.map(makeColor)].reduce((a, b) => a + b)
  );
};

function color(i) {
  let text = "black";
  let bg = "white";

  if (i >= 0) {
    const colorScheme = colors[i];
    bg = colorScheme["background"];
    text = colorScheme["text"];
  }

  changeColor(text, bg);
}

function changeColor(text, bg) {
  $(".nagee").css("color", text);
  $(".bg--nagee").css("background-color", bg);
}

window.onload = () => {

  // ya ok my api key is public boo hoo
  const apiKey = 'api_key=99b3bff8e3eb1ef3d73429f2123f7e4d';

  // also this url is long af make it "short"
  const format = 'format=json';
  const user = 'user=isthisnagee';
  const method='method=user.getrecenttracks';
  const apiBase = 'http://ws.audioscrobbler.com/2.0'
  const recentTracksUrl = `${apiBase}/?${method}&${user}&${apiKey}&${format}` 

  // i like the way this reads
  getDataFrom(recentTracksUrl).then(addSong);

  // `colors` is a list located at colors.js
  // add the color bar
  loadColors(colors);

  // set the default color
  color(11);
};
