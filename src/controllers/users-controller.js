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
        res.status(201).send()
    } else {
        res.status(404).json({ error: "Error in create user ❌" })
    }

    
}