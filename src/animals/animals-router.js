const path = require("path");
const express = require("express");
const xss = require("xss");
const AnimalsService = require("./animals-service");

const animalsRouter = express.Router();
const jsonParser = express.json();

// QUESTION: are URLs suceptible to XSS? Do they need to be sanitized? - AZ
const serializeAnimals = animal => ({
	id: animal.id,
    url: animal.imageurl,
});

animalsRouter
	.route("/")
	.get((req, res, next) => {
        // console.log("Entering animals-router... route= /")
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
            url
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
                    .json(serializeAnimals(animal));
            })
            .catch(next)
    });
    
animalsRouter
    .route('/:animal_id')
    .all((req, res, next) => {

        // comment these out when you are satisfied it works
        console.log("Entering animals-router... route= /:animal_id")
        console.log('animals-router.js: req.headers: ', req.headers);
        console.log('animals-router.js: req.originalUrl: ', req.originalUrl);
        console.log('animals-router.js: req.params: ', req.params);
        console.log('animals-router.js: req.query: ', req.query);

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
        res.json(serializeAnimals(res.animal));
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

    // the following is NOT complete
    // TODO check names for XSS
    // 
    // Find all the names for a given animal by animalId
animalsRouter
    .route('/:animal_id/names')
    .all((req, res, next) => {

        // comment these out when you are satisfied it works
        console.log("Entering animals-router... route= /:animal_id/names")
        console.log('animals-router.js: req.headers: ', req.headers);
        console.log('animals-router.js: req.originalUrl: ', req.originalUrl);
        console.log('animals-router.js: req.params: ', req.params);
        console.log('animals-router.js: req.query: ', req.query);

        // First see if the animal ID points to an existing animal
        AnimalsService.getById(req.app.get('db'), req.params.animal_id)
            .then(animal => {
                if(!animal) {
                    return res.status(404).json({
						error: { message: `Animal doesn't exist` }
					}); 
                }
                // res.animal = animal; //  QUESTION: why is this needed? Does getting the names also return the animal? - AZ
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => { // now that we know the animal ID is ok, get the names
        AnimalsService.getNamesByAnimalId(req.app.get('db'), req.params.animal_id)
        .then(names => {
            // comment the following line out when you are satisfied
            console.log("animals-router.js: get/:animals_id/names: names: ", names)
            return res.json(names); // TODO check names for XSS
        })
        .catch(next);
        
    })
module.exports = animalsRouter;