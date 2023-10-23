/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Hyerang Cho
 *      Student ID: 165832221
 *      Date:       July 21, 2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

const { artists, songs } = window;

window.addEventListener("DOMContentLoaded", defaultDisplay);

function createButton(artist) {
  var button = document.createElement("button");
  button.textContent = artist.name;
  button.addEventListener("click", function () {
    displaySongs(artist);
  });
  return button;
}

function createButtons() {
  var menu = document.getElementById("menu");

  for (let i = 0; i < window.artists.length; i++) {
    var artist = window.artists[i];
    var button = createButton(artist);
    menu.appendChild(button);
  }
}

function defaultDisplay() {
  createButtons();
  displaySongs(window.artists[0]);
}

function displaySongs(artist) {
  var links = artist.links
    .map(function (link) {
      return `<a href="${link.url}">${link.name}</a>`;
    })
    .join(", ");

  var selectedArtistTitle = document.getElementById("selected-artist");
  selectedArtistTitle.innerHTML = `${artist.name} (${links})`;

  var tbody = document.querySelector("#songs");
  tbody.innerHTML = "";

  var artistSongs = window.songs.filter(function (song) {
    return song.artistId === artist.id && !song.flagged;
  });

  artistSongs.forEach(function (song) {
    var tr = document.createElement("tr");

    var songName = document.createElement("td");
    songName.textContent = song.title;
    tr.appendChild(songName);

    var year = document.createElement("td");
    year.textContent = song.year;
    tr.appendChild(year);

    var duration = document.createElement("td");
    var minutes = Math.floor(song.duration / 60);
    var seconds = song.duration % 60;
    duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    tr.appendChild(duration);

    tr.addEventListener("click", function () {
      console.log(song);
    });

    tbody.appendChild(tr);
  });
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
