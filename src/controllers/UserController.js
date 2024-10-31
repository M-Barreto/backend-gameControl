const database = require('../database/connection')
const bcrypt = require('bcryptjs');

class UserController {

    async login(request, response) {
        const { email, password } = request.body

        try {
            const user = await database.select("*").table("usuarios").where({ email }).first()
            if (!user) {
                return response.status(401).json({ error_message: "Email does not exist" })
            } 

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return response.status(401).json({ error_message: "Invalid password" })
            }

            // Salva id do usuário na sessão para proteger outros endpoints
            request.session.userId = user.id
            return response.status(200).json({
                id: user.id,
                email: user.email,
                birth_date: user.birth_date,
                name: user.name,
            })
        } catch (error) {
            response.status(500).json({ error_message: "Internal Server Error" })
        }
    }


    async newUser(request, response) {
        const { name, birth_date, email, password } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const bodyToInsert = {
            name: name,
            birth_date: birth_date,
            email: email,
            password: hashedPassword
        }
        database.insert(bodyToInsert).table("usuarios").then(data => {
            response.status(200)
            response.json({message: "Usuário inserido com sucesso!"})
        }).catch(error => {
            if (error.sqlMessage.includes("Duplicate entry")) {
                response.status(409)
                response.json({error_message: "E-mail já existe" })
            } else {
                response.status(500)
                response.json({ error_message: "Internal server error" })
            }
        })
    }

    // endpoint protegido, somente usuários autenticados podem usar
    getUsers(request, response) {
        if (!request.session.userId) {
            return response.status(401).json({ error_message: "Login required" })
        }
        database.select('id', 'name', 'email', 'birth_date').table("usuarios").then(users => {
            response.status(200).json(users)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }

    // endpoint protegido, somente usuários autenticados podem usar
    getUser(request, response) {
        const id = request.params.id
        if (!request.session.userId) {
            return response.status(401).json({ error_message: "Login required" })
        }
        database.select('id', 'name', 'email', 'birth_date').table("usuarios").where({id:id}).then(user => {
            response.status(200).json(user)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }

    // endpoint protegido, somente o usuário (autenticado) pode atualizar suas próprias informações
    async updateUser(request, response) {
        const { id, name, birth_date, email, password } = request.body
        if (request.session.userId !== parseInt(id)) {
            return response.status(403).json({ error_message: "You don't have permission to update user" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        database.where({id: id}).update({name: name, birth_date: birth_date, email: email, password: hashedPassword}).table("usuarios").then(data => {
            response.status(200).json({ id, name, birth_date, email })
        }).catch(_ => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }


    // endpoint protegido, somente o usuário (autenticado) pode apagar suas próprias informações
    removeUser(request, response) {
        const id = request.params.id
        if (request.session.userId !== parseInt(id)) {
            return response.status(403).json({ error_message: "You don't have permission to delete user" })
        }
        database.where({id: id}).del().table("usuarios").then(data => {
            response.status(200).json({ message: "Usuário removido com sucesso!" })
        }).catch(error => {
            response.status(500).json({ error_message: "Internal Server Error" })
        })
    }
}

module.exports = new UserController()