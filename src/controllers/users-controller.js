const UserModel = require('../models/user')

exports.createUser = (req, res) => {
    const {
        first_name,
        last_name,
        email,
        techs
    } = req.body

    const user = new UserModel({ first_name, last_name, email, techs })
    const saved = user.save()
    
    if (saved) {
        return res.status(201).send()
    }

    return res.status(404).json({ error: "Error in created user ❌" })
}

exports.findAll = async (req, res) => {
    const users = await UserModel.find()
    if (users.length > 0) {
        return res.status(200).json(users)
    }

    return res.status(200).json({ message: "No registered user yet." })
}

exports.updateUser = async (req, res) => {
    const { id } = req.params
    const {
        first_name,
        last_name,
        email,
        techs
    } = req.body
    const user = await UserModel.updateOne({_id: id}, {$set: { first_name, last_name, email, techs }})
    
    if (user) {
        return res.status(201).send()
    }

    return res.status(404).json({ error: "Error in updated user ❌" })
}

exports.findOne = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id)

    if (user) {
        return res.status(200).json(user)
    }

    return res.status(404).json({ error: "No have user with this _id" })
}

exports.delete = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.deleteOne({ _id: id })

    if (user) {
        return res.status(200).send()
    }
    
    return res.status(404).json({ error: "No have user with this _id" })
}