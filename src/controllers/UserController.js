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
            response.json({ message: "Usuário inserido com sucesso!" })
        }).catch(error => {
            if (error.sqlMessage.includes("Duplicate entry")) {
                response.status(409)
                response.json({ error_message: "E-mail já existe" })
            } else {
                response.status(500)
                response.json({ error_message: "Internal server error" })
            }
        })
    }

    getUsers(request, response) {
        database.select('id', 'name', 'email', 'birth_date').table("usuarios").then(users => {
            response.status(200).json(users)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }

    getUser(request, response) {
        const id = request.params.id
        database.select('id', 'name', 'email', 'birth_date').table("usuarios").where({ id: id }).then(user => {
            console.log(user);
            if (user.length === 0) {
                return response.status(404).json({ error_message: "User not found" });
            }
            response.status(200).json(user)
        }).catch(error => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }


    async updateUser(request, response) {
        const { id, name, birth_date, email } = request.body
        database.where({ id: id }).update({ name: name, birth_date: birth_date, email: email }).table("usuarios").then(data => {
            response.status(200).json({ id, name, birth_date, email })
        }).catch(_ => {
            response.status(500).json({ error_message: "Internal server error" })
        })
    }

    async updatePassword(request, response) {
        const { id, newPassword, oldPassword } = request.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await database.select("*").table("usuarios").where({ id }).first();
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        const isSamePassword = await bcrypt.compare(oldPassword, hashedPassword);
        if(isSamePassword){
            return response.status(403).json({ error_message: "nova senha igual a antiga" })
        }
        if (!isValidPassword) {
            return response.status(401).json({ error_message: "senha antiga incorreta" })
        }
        database.where({ id }).update({ password: hashedPassword }).table("usuarios").then(data => {
            response.status(200).json({ message: "Senha alterada com sucesso" })
        }).catch(_ => {
            response.status(500).json({ error_message: "Internal server error" })
        })

    }

    removeUser(request, response) {
        const id = request.params.id
        database.where({ id: id }).del().table("usuarios").then(data => {
            response.status(200).json({ message: "Usuário removido com sucesso!" })
        }).catch(error => {
            response.status(500).json({ error_message: "Internal Server Error" })
        })
    }
}

module.exports = new UserController()