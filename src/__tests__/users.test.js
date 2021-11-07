const request = require('supertest')
const { app } = require('../app')
const UserModel = require('../models/user')
const mongoose = require('mongoose')
require('dotenv/config')

const mockUser = {
	first_name:"any",
	last_name:"test",
	email:"mock@mail.com",
	techs: ["node", "react"]
}

const mockTwoUser = {
	first_name:"mock",
	last_name:"test",
	email:"testmail@mail.com",
	techs: ["node", "react", "php"]
}

describe('User CRUD Operations',() => {   
    beforeAll(async () => {
            await mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    beforeEach(async () => {
        await UserModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    test('should be able create a new user', async () => {
       const response = await request(app).post('/users').send(mockUser)
       expect(response.status).toBe(201)
       expect(response.body.first_name).toEqual(mockUser.first_name)
       expect(response.body.last_name).toEqual(mockUser.last_name)
       expect(response.body.email).toEqual(mockUser.email)
       expect(response.body.techs).toEqual(mockUser.techs)
    })

    test('should not be able create with same email', async () => {
        await request(app).post('/users').send(mockUser)
        const response = await request(app).post('/users').send(mockUser)
        
        expect(response.status).toBe(400)
        expect(response.body.error).toEqual('This email already used!')
    })

    test('should be able list all users', async () => {
        await request(app).post('/users').send(mockUser)
        await request(app).post('/users').send(mockTwoUser)

        const response = await request(app).get('/users')

        expect(response.status).toBe(200)
        expect(response.body.length > 1)
    })

    test('should be able update user with correct _id', async () => {
        const user = await request(app).post('/users').send(mockUser)
        const { _id } = user.body

        const response = await request(app).put(`/users/${_id}`).send({ first_name: 'Updated Name' })
        
        expect(response.status).toBe(201)
    })

    test('should be able delete user with correct _id', async () => {
        const user = await request(app).post('/users').send(mockUser)
        const { _id } = user.body

        const response = await request(app).delete(`/users/${_id}`)
        
        expect(response.status).toBe(200)
    })
})