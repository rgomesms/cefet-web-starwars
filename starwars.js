// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'

//Exercicio 1
import { play } from "./music.js"

const songData = {
	audioUrl: "./audio/tema-sw.mp3",
	coverImageUrl: "./imgs/logo.svg",
	title: "Intro",
	artist: "John Williams"
}

play(songData, document.body);


//Exercicio 2 e 3
import { decimalToRoman } from "./roman.js";
import { restartAnimation } from "./restart-animation.js"
import { friendlyFetch } from "./friendly-fetch.js";

const moviesList = document.querySelector("#filmes ul");
moviesList.innerHTML = "";

const addMovieElement = ({ episode_id, title, content }) => {
	let newMovieElement = document.createElement('li');
	newMovieElement.innerHTML = `Episode ${decimalToRoman(episode_id)} - ${title}`;

	newMovieElement.addEventListener('click', () => {
		let introductionElement = document.querySelector('pre.introducao');
		introductionElement.innerHTML = `Episode ${decimalToRoman(episode_id)}\n${title}\n\n${content}`
		restartAnimation(introductionElement);
	})

	moviesList.appendChild(newMovieElement);
}

// fetch(`${API_ENDPOINT}/films`).then(response => response.json())
friendlyFetch(`${API_ENDPOINT}/films`)
	.then(response => {
		let data = response.results.map(({ episode_id, title, opening_crawl }) => { return { episode_id, title, "content": opening_crawl } });

		//Opcional 4
		data = data.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);

		//Exercicio 2
		data.forEach((data) => addMovieElement(data)
		)
	});
