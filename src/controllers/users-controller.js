const UserModel = require('../models/user')

exports.createUser = async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        techs
    } = req.body

    const findUser = await UserModel.findOne({ email })
    
    if (findUser) {
        return res.status(400).json({ error: 'This email already used!' })
    }

    const user = new UserModel({ first_name, last_name, email, techs })
    const saved = user.save()
    
    if (saved) {
        return res.status(201).json(user)
    }
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

    const user = await UserModel.findByIdAndUpdate({_id: id}, {$set: { first_name, last_name, email, techs }}, { new: true })
    
    if (user) {
        return res.status(201).json(user)
    }

    return res.status(400).json({ error: "No have user with this _id" })
}

exports.findOne = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id)

    if (user) {
        return res.status(200).json(user)
    }

    return res.status(400).json({ error: "No have user with this _id" })
}

exports.delete = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findOneAndRemove({ _id: id })

    if (user) {
        return res.status(200).send()
    }

    return res.status(400).json({ error: "No have user with this _id" })
}