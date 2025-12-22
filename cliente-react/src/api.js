const BASE_URL = 'https://pokeapi.co/api/v2';

export const typeColors = {
  grass: 'bg-green-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  normal: 'bg-gray-400',
  bug: 'bg-green-600',
  poison: 'bg-purple-500',
  flying: 'bg-indigo-400',
  ground: 'bg-yellow-700',
  fairy: 'bg-pink-400',
  fighting: 'bg-red-700',
  psychic: 'bg-pink-600',
  rock: 'bg-yellow-800',
  ice: 'bg-blue-200',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  steel: 'bg-gray-500',
  dark: 'bg-gray-800',
};

export async function fetchPokemonList(offset = 0) {
  const resp = await fetch(`${BASE_URL}/pokemon?limit=20&offset=${offset}`);
  if (!resp.ok) throw new Error('Erro ao buscar lista');
  return await resp.json();
}

export async function fetchPokemonData(name) {
  const resp = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!resp.ok) throw new Error('Erro ao buscar Pokémon');
  return await resp.json();
}

export async function fetchPokemonSpecies(name) {
  const resp = await fetch(`${BASE_URL}/pokemon-species/${name}`);
  if (!resp.ok) throw new Error('Erro ao buscar espécie');
  return await resp.json();
}

export async function fetchEvolutionChain(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Erro ao buscar cadeia evolutiva');
  return await resp.json();
}