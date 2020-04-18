const path = require('path')
const express = require('express')
const xss = require('xss')
const NamesService = require('./names-service')

const namesRouter = express.Router()
const jsonParser = express.json()

const serializeName = name => ({
    id: name.id,
    name: xss(name.name),
    animalid: xss(name.animalid),
    votes: xss(name.votes)

})

namesRouter
.route('/')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    NamesService.getAllNames(knexInstance)
        .then(names => {
            res.json(names.map(serializeName))
        })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { name, animalid, votes  } = req.body
    const newName = { name, animalid, votes }

    for (const [key, value] of Object.entries(newName))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    NamesService.insertName(
        req.app.get('db'),
        newName
    )
    .then(name => {
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${name.id}`))
            .json(serializeName(name))
    })
    .catch(next)
})

namesRouter
    .route('/:nameId')
    .all((req, res, next) => {
        NamesService.getById(
            req.app.get('db'),
            req.params.nameId
        )
        .then(name => {
            if(!name) {
                return res.status(404).json({
                    error: { message: `Name doesn't exist` }
                })
            }
            res.name = name
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeName(res.name))
    })
    .delete((req, res, next) => {
        NamesService.deleteName(
            req.app.get('db'),
            req.params.nameId
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {name, votes, animalid } = req.body;
        console.log("names-router.js : req.body : ", req.body)
        const nameToUpdate = { name, votes, animalid }
        console.log("names-router.js : nameToUpdate : ", nameToUpdate)

        const numberOfValues = Object.values(nameToUpdate).filter(Boolean)
			.length;
		if (numberOfValues ===0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'name, vote or animalid'`
				}
			});
        }
        namesService.updateName(
            req.app.get('db'),
            req.params.nameId,
            nameToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

    module.exports = namesRouter