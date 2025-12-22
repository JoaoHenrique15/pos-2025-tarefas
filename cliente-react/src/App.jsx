import { useState, useEffect } from 'react';
import { 
  fetchPokemonList, 
  fetchPokemonData, 
  fetchPokemonSpecies, 
  fetchEvolutionChain, 
  typeColors 
} from './api';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar lista inicial
  useEffect(() => {
    carregarLista(offset);
  }, [offset]);

  const carregarLista = async (currentOffset) => {
    setLoading(true);
    try {
      const data = await fetchPokemonList(currentOffset);
      setPokemons(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verDetalhes = async (name) => {
    setLoading(true);
    try {
      const pkm = await fetchPokemonData(name);
      const species = await fetchPokemonSpecies(name);
      
      let evolution = null;
      if (species.evolution_chain?.url) {
        evolution = await fetchEvolutionChain(species.evolution_chain.url);
      }

      setSelectedPokemon({ ...pkm, speciesData: species, evolutionData: evolution });
    } catch (error) {
      alert('Pokemon não encontrado!');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm) verDetalhes(searchTerm.toLowerCase());
  };

  // Renderização da Tela de Detalhes
  if (selectedPokemon) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
          <button 
            onClick={() => setSelectedPokemon(null)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ← Voltar
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold capitalize mb-2">{selectedPokemon.name}</h1>
            <img 
              src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default} 
              alt={selectedPokemon.name}
              className="w-48 h-48 mx-auto"
            />
            
            <div className="flex justify-center gap-2 mt-4 mb-6">
              {selectedPokemon.types.map((t) => (
                <span 
                  key={t.type.name} 
                  className={`${typeColors[t.type.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full capitalize`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="bg-gray-50 rounded p-4 text-left">
              <h3 className="font-bold border-b pb-2 mb-2">Estatísticas</h3>
              {selectedPokemon.stats.map((s) => (
                <div key={s.stat.name} className="mb-2">
                  <span className="capitalize text-sm">{s.stat.name}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da Lista Principal
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-red-600">Pokedéx React</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Buscar Pokémon..." 
              className="border px-3 py-2 rounded shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded font-bold hover:bg-yellow-500">
              Buscar
            </button>
          </form>
        </header>

        {loading ? (
          <p className="text-center text-xl">Carregando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pokemons.map((p) => {
                const id = p.url.split('/').filter(Boolean).pop();
                return (
                  <div 
                    key={p.name} 
                    onClick={() => verDetalhes(p.name)}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center"
                  >
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={p.name}
                      className="w-24 h-24"
                    />
                    <h2 className="text-xl capitalize font-semibold mt-2">{p.name}</h2>
                    <span className="text-gray-500 text-sm">#{id}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button 
                disabled={offset === 0}
                onClick={() => setOffset((prev) => Math.max(0, prev - 20))}
                className="bg-blue-500 text-white px-6 py-2 rounded disabled:bg-gray-300"
              >
                Anterior
              </button>
              <button 
                onClick={() => setOffset((prev) => prev + 20)}
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;