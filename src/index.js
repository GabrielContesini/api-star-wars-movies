const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
const port = 3000;
const Movie = mongoose.model('movie', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
})

app.get('/', async (req, res) => {
    const movies = await Movie.find()
    return res.send(movies)
})

app.delete("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    return res.send(movie)
})

app.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await movie.save()
    return res.send(movie)
})

app.put('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    return res.send(movie)
})

app.listen(port, () => {
    mongoose.connect('Your MongoDb Connection URL');
    console.log("Server is running")
})

