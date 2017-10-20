let currentColors;
/*
 * Takes a json object `lastfm` and adds the data in it to
 * the html
 */
const addSongs = (numSongs = 12, border = true) => lastfm => {
  const tracks = lastfm.recenttracks.track;
  const artistNameAndMusicDivs = tracks.slice(0, numSongs).map(song => {
    // get jqeury stuff
    const albumTextDiv = $("#album-text");
    const albumArtDiv = $("#album-art");

    const albumName = song["album"]["#text"];
    const songName = song["name"];
    const artistName = song["artist"]["#text"];
    const albumArtLink = song["image"][0]["#text"];
    const songLink = song["url"];
    const ba = border ? "ba" : "";
    const music = `
      <div class="w4 dib">
      <a href="${songLink}">
      <img class="db w3 h3 ba b--black-10" alt="album cover"
    src="${albumArtLink}">
      </a>
      <dl class="mt2 f6 lh-copy ${ba} pa1">
      <dt class="clip">Title</dt>
      <dd class="ml0 nagee">${songName}</dd>
      </dl>
      </div>
      `;
    return { artistName, music };
  });

  const groupedArtistsToMusicDiv = artistNameAndMusicDivs.reduce((artists, artistNameDiv) => {
    const { artistName, music } = artistNameDiv;
    const idxOfArtist = artists.findIndex(artist => artist.name === artistName);

    if (idxOfArtist > -1) artists[idxOfArtist].divs.push(music);
    else artists.push({ name: artistName, divs: [music] });

    return artists;
  }, []);

  const divs = groupedArtistsToMusicDiv.map(artistToDiv => {
    const { name, divs } = artistToDiv;
    const bb = border ? "bb" : "";
    const artistDiv = `<div><dl><dt class="clip">Artist</dt>
      <dd class="ml0 nagee">${name}</dd></dl></div>`;
    return `<div class="${bb} w-100">${artistDiv}${divs.join(" ")}</div>`;
  });

  $("#music").append(divs);
};

/*
 * Takes a url `url`, gets the json data it gives,
 * and returns a function that acts on that data
 */

let __cache;
const getDataFrom = url => {
  if (__cache) return { then: dataFunc => dataFunc(__cache) };
  return {
    then: dataFunc => {
      $.ajax({
        dataType: "json",
        url: url,
        success: data => {
          __cache = data;
          dataFunc(data);
        },
      });
    },
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

  const colorList = [defaultColors, ...colors.map(makeColor)].reduce((a, b) => a + b);
  $(".color-list").replaceWith(colorList);
};

function color(i) {
  let text = "black";
  let bg = "white";

  if (i >= 0) {
    const colorScheme = colors[i];
    bg = colorScheme["background"];
    text = colorScheme["text"];
  }

  currentColors = () => changeColor(text, bg);
  currentColors();
}

function changeColor(text, bg) {
  $(".nagee").css("color", text);
  $(".bg--nagee").css("background-color", bg);
}

// ya ok my api key is public boo hoo
const apiKey = "api_key=99b3bff8e3eb1ef3d73429f2123f7e4d";

// also this url is long af make it "short"
const format = "format=json";
const user = "user=isthisnagee";
const method = "method=user.getrecenttracks";
const apiBase = "https://ws.audioscrobbler.com/2.0";
const recentTracksUrl = `${apiBase}/?${method}&${user}&${apiKey}&${format}`;

const __button = "#more-or-less";
const add20Songs = addSongs(20);
const add1Song = addSongs(1, false);
window.onload = () => {
  const add1Song = addSongs(1, false);
  // i like the way this reads
  const add1SongAndButton = data => {
    add1Song(data);
    $("#msc").append([
      `<button class="ml2 mt2 nagee bg--nagee" id="more-or-less">more ...</button>`,
    ]);
    $(__button).click(toggleMoreOrLess());
  };
  getDataFrom(recentTracksUrl).then(add1SongAndButton);

  // `colors` is a list located at colors.js
  // add the color bar
  loadColors(colors);

  // set the default color
  color(11);
};

function toggleMoreOrLess() {
  let more = true;
  return function() {
    if (more) {
      more = false;
      $("#music").empty();
      getDataFrom(recentTracksUrl).then(add20Songs);
      $(__button).text("less ...");
    } else {
      more = true;
      $("#music").empty();
      getDataFrom(recentTracksUrl).then(add1Song);
      $(__button).text("more ...");
    }
    currentColors();
  };
}
