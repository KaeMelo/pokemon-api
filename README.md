#  API Pokémon Dockerizada
A API Pokémon Dockerizada é um projeto simples desenvolvido para demonstrar como criar uma API que consome dados da PokeAPI e permite aos usuários criar, gerenciar e visualizar times de Pokémon. A aplicação foi containerizada com Docker para facilitar a implantação e o compartilhamento.

- **ROTAS**
  - GET /api/teams - A API fornece uma rota para listar todos os times de Pokémon registrados, juntamente com os detalhes de cada Pokémon no time.
  - GET /api/teams/{user} - Os usuários podem buscar um time específico com base no nome do usuário fornecido.
  - POST /api/teams - Os usuários podem criar um novo time de Pokémon fornecendo o nome do usuário e uma lista de Pokémon desejados.

 # Tecnologias Utilizadas
 
- **Node.js:** Plataforma de tempo de execução JavaScript usada para desenvolver a API.
- **Express.js:** Framework web Node.js usado para criar e gerenciar rotas na API.
- **Docker:** Plataforma de virtualização de contêineres usada para containerizar a aplicação.
- **PokeAPI:** API pública utilizada para obter dados sobre Pokémon.

# Como usar
**INSTALAÇÃO**
- **1°** Certifique-se de ter o Docker instalado na sua máquina. Se ainda não tiver, siga as instruções de instalação disponíveis em https://docs.docker.com/get-docker/.
- **2°** Clone este repositório para o seu ambiente local.
  
**EXECUÇÃO COM DOCKER**
  
Para iniciar a API usando Docker, siga os passos abaixo:
- **1°** Abra um terminal e navegue até o diretório do projeto.
- **2°** Execute o seguinte comando para construir a imagem Docker:
  
      docker-compose build

Após a construção da imagem, inicie a API executando o seguinte comando:
    
      docker-compose up
      
Isso iniciará o servidor da API na porta padrão 3000 dentro de um contêiner Docker.

**COMO ACESSAR**

Depois de iniciar a API com Docker, você pode acessá-la em:
           
    http://localhost:3000

**EXEMPLOS**

**Output /api/teams/{user}**

     {
    "owner": "kae",
    "pokemons": [
      {
        "id": 9,
        "name": "blastoise",
        "weight": 855,
        "height": 16
      },
      {
        "id": 25,
        "name": "pikachu",
        "weight": 60,
        "height": 4
      }
    ]
    }

**Output /api/teams**

    {
      "1": {
        "owner": "lucas",
        "pokemons": [
          {
            "id": 9,
            "name": "blastoise",
            "weight": 855,
            "height": 16
          },
          {
            "id": 25,
            "name": "pikachu",
            "weight": 60,
            "height": 4
          }
        ]
      },
      "2": {
        "owner": "kae",
        "pokemons": [
          {
            "id": 9,
            "name": "blastoise",
            "weight": 855,
            "height": 16
          },
          {
            "id": 25,
            "name": "pikachu",
            "weight": 60,
            "height": 4
          },
          {
            "id": 3,
            "name": "venusaur",
            "weight": 1000,
            "height": 20
          },
          {
            "id": 6,
            "name": "charizard",
            "weight": 905,
            "height": 17
          },
          {
            "id": 131,
            "name": "lapras",
            "weight": 2200,
            "height": 25
          },
          {
            "id": 54,
            "name": "psyduck",
            "weight": 196,
            "height": 8
          }
        ]
      }
    }

**Input**

    {
      "user": "kae",
      "pokemonList": [
        "blastoise",
        "pikachu",
        "charizard",
        "venusaur",
        "lapras",
        "dragonite"
      ]
    }
