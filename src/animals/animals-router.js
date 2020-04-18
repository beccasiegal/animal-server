const path = require("path");
const express = require("express");
const xss = require("xss");
const AnimalsService = require("./animals-service");

const animalsRouter = express.Router();
const jsonParser = express.json();

const serializeAnimals = animal => ({
	id: animal.id,
    url: Image.url
});

animalsRouter
	.route("/")
	.get((req, res, next) => {
		const knexInstance = req.app.get("db");
	AnimalsService.getAllAnimals(knexInstance)
			.then(animals => {
				res.json(animals.map(serializeAnimals));
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { url } = req.body;
		const newAnimal = {
            url,
            id
		};

		for (const [key, value] of Object.entries(newAnimal))
			if (value == null)
				return res.status(400).json({
					error: {
						message: `Missing '${key}' in request body`
					}
                });
        
        AnimalsService.insertAnimal(req.app.get('db'), newAnimal)
            .then(animal => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${animal.id}`))
                    .json(serializeAnimal(animal));
            })
            .catch(next)
    });
    
animalsRouter
    .route('/:animal_id')
    .all((req, res, next) => {
        AnimalsService.getById(req.app.get('db'), req.params.animal_id)
            .then(animal => {
                if(!animal) {
                    return res.status(404).json({
						error: { message: `Animal doesn't exist` }
					}); 
                }
                res.animal = animal;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serializeAnimal(res.animal));
    })
    .delete((req, res, next) => {
        AnimalsService.deleteAnimal(req.app.get('db'), req.params.animal_id)
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const {name } = req.body;
        const animalToUpdate = { name }

        const numberOfValues = Object.values(animalToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'animal name'`
				}
			});
        }
        AnimalsService.updateAnimal(
            req.app.get('db'),
            req.params.animal_id,
            animalToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

module.exports = animalsRouter;