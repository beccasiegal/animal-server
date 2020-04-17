const express = require('express')
const { isWebUri } = require('valid-url')
const logger = require('./logger')
const store = require('./store')

const imageRouter = express.Router()
const bodyParser = express.json()

imageRouter
  .route('/pictures')
  .get((req, res) => {
    res.json(store.images)
  })


    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`)
      return res.status(400).send(`'url' must be a valid URL`)
    }

    const image = { url }

    store.images.push(images)

    logger.info(`Image with id ${image.id} created`)
    res
      .status(201)
      .location(`http://localhost:8000/images`)
      .json(image)
  })



module.exports = ImagesRouter