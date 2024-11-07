const database = require('../database/connection');

class GamesController{
    addGames(request, response) {
        const { nome, lancamento, genero, nota, sinopse, imagem} = request.body;
        const bodyToInsert = {
            nome: nome,
            lancamento: lancamento,
            nota: nota,
            genero: genero,
            sinopse: sinopse,
            imagem: imagem
        }
        database.insert(bodyToInsert).table("jogos").then(data => {
            response.status(200).json({message: "jogo inserido com sucesso"})
        }).catch(error => {
            response.status(500)
            response.json({ error_message: "Internal server error" })
        })
    }

    getGames(request, response) {
        database.select('id', 'nome', 'lancamento', 'genero', 'nota', 'sinopse', 'imagem').table("jogos").then(games => {
            response.status(200).json(games)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }

    getGame(request, response) {
        const id = request.params.id
        database.select('id', 'nome', 'lancamento', 'genero', 'nota', 'sinopse', 'imagem').table("jogos").where({ id: id }).then(game => {
            if (game.length === 0) {
                return response.status(404).json({ error_message: "Game not found" });
            }
            response.status(200).json(game)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }
}

module.exports = new GamesController()