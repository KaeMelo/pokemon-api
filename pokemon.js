const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let teams = [];
let nextTeamId = 1;

app.use(express.json());

async function getPokemonDetails(pokemonName) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const { id, height, weight } = response.data;
    return { id, height, weight };
  } catch (error) {
    throw new Error(`Erro ao procurar detalhes dos pokemons. ${pokemonName}`);
  }
}

app.get('/api/teams', (req, res) => {
  try {
    const teamsOutput = teams.map(team => {
      return {
        id: team.id,
        owner: team.user,
        pokemons: team.pokemonList.map(pokemon => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            weight: pokemon.weight,
            height: pokemon.height
          };
        })
      };
    });
    res.status(200).json(teamsOutput);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve teams', error: error.message });
  }
});

app.get('/api/teams/:user', (req, res) => {
  try {
    const user = req.params.user;
    const team = teams.find(team => team.user === user);
    if (!team) {
      res.status(404).json({ message: 'Time não encontrado para esse usuário.' + user });
    } else {
      const pokemons = team.pokemonList.map(pokemon => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height
        };
      });
      res.json({ owner: team.user, pokemons });
    }
  } catch (error) {
    res.status(500).json({ message: 'Falha ao recuperar time.', error: error.message });
  }
});

app.post('/api/teams', async (req, res) => {
  
  try {
    const { user, pokemonList } = req.body;
    const pokemonDetailsPromises = pokemonList.map(async pokemon => {
      const details = await getPokemonDetails(pokemon);
      return { name: pokemon, ...details };
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    const teamId = nextTeamId++;
    const newTeam = { id: teamId, user, pokemonList: pokemonDetails };
    teams.push(newTeam);
    res.status(201).json({ message: 'Time criado com sucesso.', id: teamId });
  } catch (error) {
    res.status(400).json({ message: 'Falha ao criar time.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});