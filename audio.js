/* Version 13 */

// Define variables
var playlistTitle = "";
var count = 0;
var current = 0;
var started = false;
var songs = new Array;
var titles = new Array;
var artists = new Array;
var composers = new Array;





/****************************************************************************************/
/*                              ONLY EDIT IN THE AREA BELOW                             */
/* Instructions:                                                                        */
/*    1. Replace the "Playlist Title" with the title of the playlist.                   */
/*    2. Replace the "PutDirectLinkHere.mp3" with the direct link to the audio files.   */
/*       They MUST end with .mp3.                                                       */
/*    3. Replace the "Title of Song" with the title of the corresponding song.          */
/*    4. Replace the "Artist of Song" with the artist of the corresponding song.        */
/*       Note: The order of songs should correspond with the order of titles, artists,  */
/*       and composers.                                                                 */
/*    5. Replace the "Composer of Song" with the composer of the corresponding song.    */
/*       If there is no composer, type "none".                                          */
/*    6. If more songs are added, each line should end with a comma (outside of the     */
/*       quotes) EXCEPT the final line.                                                 */
/*    7. Save the file.                                                                 */
/*    Note: playlist.html can be embedded in an iFrame as well.                         */
/****************************************************************************************/

playlistTitle = "Playlist Title";

songs = [
         'PutDirectLinkHere.mp3',
         'PutDirectLinkHere.mp3'
        ];

titles = [
         'Title of Song',
         'Title of Song'
        ];

artists = [
         'Artist of Song',
         'Artist of Song'
        ];

composers = [
         'Composer of Song',
         'none'
        ];

/****************************************************************************************/
/*                              DO NOT EDIT BELOW THIS LINE                             */
/****************************************************************************************/









/* playSong() takes the index and plays the song
 * @param {integer} num  The index of song
*/

function playSongs(num){
  started = true;
  song = document.getElementById("audio-block" + num);
  
  song.pause();
  song.play();
  
  $("#description" + num).css({"background-color": "#354b44", "border-color": "#354b44"});
  $("#audio-block" + num).css({"background-color": "#354b44", "border-color": "#354b44"});
  song.currentTime = 0;
  current = num;
  
  if (num == 0) {
    prevSongText = "Now playing: " + titles[num] + " by " + artists[num];
      if (composers[num] != "none") { prevSongText += " composed by " + composers[num]; }
    prevSongText += ". Click here to play the last song on the list: " + titles[songs.length - 1] + " by " + artists[songs.length - 1];
      if (composers[num - 1] != "none") { prevSongText += " composed by " + composers[songs.length - 1]; }
  } else {
    prevSongText = "Now playing: " + titles[num] + " by " + artists[num];
      if (composers[num] != "none") { prevSongText += " composed by " + composers[num]; }
    prevSongText += ". Click here to play the previous song: " + titles[num - 1] + " by " + artists[num - 1];
      if (composers[num - 1] != "none") { prevSongText += " composed by " + composers[num - 1]; }
  }
  
  if (num >= songs.length - 1) {
    nextSongText = "Now playing: " + titles[num] + " by " + artists[num];
      if (composers[num] != "none") { nextSongText += " composed by " +  composers[num]; }
    nextSongText += ". Click here to play the first song: " + titles[0] + " by " + artists[0];
      if (composers[0] != "none") { nextSongText += " composed by " +  composers[0]; }
  } else {
    nextSongText = "Now playing: " + titles[num] + " by " + artists[num];
      if (composers[num] != "none") { nextSongText += " composed by " + composers[num]; }
    nextSongText += ". Click here to play the next song: " + titles[num + 1] + " by " + artists[num + 1];
      if (composers[num + 1] != "none") { nextSongText += " composed by " + composers[num + 1]; }
  }

  $("#play-prev").attr("aria-label", prevSongText);
  $("#play-next").attr("aria-label", nextSongText);
  
  song.onended = function() { playNext(); };
  
  return num;
}

/* startPlay() sets the index to zero, started to true, and runs playSongs()
 * button disappears after the first play
*/

function startPlay(){
  num = 0;
  started = true;
  playSongs(num);
  $("#play-first").css({"visibility": "hidden"});
  current = num;
  return num;
}

/* playNext() pauses the current song, increases the index and runs playSongs() */

function playNext(){
  song = document.getElementById("audio-block" + num);
  song.pause();
  $("#description" + num).css({"background-color": "#000", "border-color": "#000"});
  $("#audio-block" + num).css({"background-color": "#000", "border-color": "#000"});
  num++;
  if (num == songs.length) { num = 0; }
  current = num;
  playSongs(num);
  return num;
}

/* playPrev() pauses the current song, decreases the index and runs playSongs() */

function playPrev(){
  num = current;
  song = document.getElementById("audio-block" + num);
  song.pause();
  $("#description" + num).css({"background-color": "#000", "border-color": "#000"});
  $("#audio-block" + num).css({"background-color": "#000", "border-color": "#000"});
  num--;
  if (num < 0) { num = songs.length - 1; }
  current = num;
  playSongs(num);
  return num;
}

/* playOutside() takes the selected song and plays it and updates the style
 * int selected Selected song
*/

function playOutside(selected) {
  $("#description" + current).css({"background-color": "#000", "border-color": "#000"});
  $("#audio-block" + current).css({"background-color": "#000", "border-color": "#000"});
  song = document.getElementById("audio-block" + selected);
  $("#description" + selected).css({"background-color": "#354b44", "border-color": "#354b44"});
  $("#audio-block" + selected).css({"background-color": "#354b44", "border-color": "#354b44"});
  song.play();
  if (selected != current) { dontPlay(current); }
  num = selected;
  current = selected;
  song.onended = function() { playNext(); };
  return current;
}

/* dontPlay() takes the selected song and stops it and updates the style
 * int selected Selected song
*/
function dontPlay(current) {
  song = document.getElementById("audio-block" + current);
  $("#description" + current).css({"background-color": "#000", "border-color": "#000"});
  $("#audio-block" + current).css({"background-color": "#000", "border-color": "#000"});
  song.pause();
  return current;
}

$(document).ready(function(){
  document.oncontextmenu = function(){ return false; }
  
  $(document).mousedown(function(e){
    if (e.button == 2) { return false; }
    return true;
  })
});

/* loadSongs() load the songs from the array above. */
function loadSongs(){
  var count = 0;
  $("#title").html(playlistTitle);
  
  while (count != songs.length) {
    songID = "audio-block" + count;
    descID = "description" + count;
    message = '<li aria-label="Song number ' + (count + 1) + ' of ' + songs.length + '">' +
      '<p class="desc" id="' + descID + '">' + (count + 1) + '. ' + titles[count] + " by " + artists[count];
      if (composers[count] != "none") { message += "<br />Composer: " + composers[count]; }
    message += '</p>' +
      '<audio id="' + songID + '" controls preload="none" onplay="playOutside(' + count + ')" onpause="dontPlay(' + count + ')"><source src="' + songs[count] + '" type="audio/mp3" />Your browser does not support HTML5 audio.</audio>' +
      '</li>';
    $("ul").append(message);
    count++; 
  }
}