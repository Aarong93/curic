import React from 'react';
import ToyItem from './toy_item';

const defaultDetail = {
	image_url: '',
	name: '',
	poke_type: '',
	attack: '',
	defense: '',
	moves: []
};

const PokemonDetail = ({pokemonDetail = defaultDetail, toys, children}) => (
	<section className="pokemon-detail">
		<ul>
			<img src={pokemonDetail.image_url} alt={pokemonDetail.name}/>
				<li><h2>{pokemonDetail.name}</h2></li>
				<li>Type: {pokemonDetail.poke_type}</li>
				<li>Attack: {pokemonDetail.attack}</li>
				<li>Defense: {pokemonDetail.defense}</li>
				<li>Moves: &#34;{pokemonDetail.moves.join(', ')}&#34;</li>
		</ul>
		<section className="toys">
			<h3>Toys</h3>
			<ul className="toy-list">
				{toys.map((toy) => <ToyItem key={toy.name} toy={toy}/>)}
			</ul>
		</section>
		{children}
	</section>
);

export default PokemonDetail;
