#!/usr/bin/node

const request = require("request");

const movieId = process.argv[2];

// Make HTTP GET request to fetch movie information
request(`https://swapi.dev/api/films/${movieId}/`, (error, response, body) => {
  if (error) {
    console.error("Error fetching movie information:", error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(
      "Failed to fetch movie information. Status code:",
      response.statusCode
    );
    return;
  }

  const movieData = JSON.parse(body);
  const characterURLs = movieData.characters;

  // Make individual requests for each character
  characterURLs.forEach((characterURL) => {
    request(characterURL, (charError, charResponse, charBody) => {
      if (charError) {
        console.error("Error fetching character information:", charError);
        return;
      }

      if (charResponse.statusCode !== 200) {
        console.error(
          "Failed to fetch character information. Status code:",
          charResponse.statusCode
        );
        return;
      }

      const characterData = JSON.parse(charBody);
      console.log(characterData.name);
    });
  });
});
