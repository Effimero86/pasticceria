const Cake = require('../models/cake');

const update = (cake) => {
    if((Date.now() - cake.baked.getTime()) > (1000 * 86400 * 3)) {
        cake.price = Math.round((cake.price * 0.2 + Number.EPSILON) * 100) / 100;
    } else if((Date.now() - cake.baked.getTime()) > (1000 * 86400 * 2)) {
        cake.price = Math.round((cake.price * 0.8 + Number.EPSILON) * 100) / 100;
    }
    return cake;
}

module.exports.cake_get_by_id = (req, res) => {
    const id = req.params.id;
    Cake.findById(id)
    .then(cake => {
        cake = update(cake);
        res.status(200).json(cake);
    })
    .catch(err => console.log(err));
}

module.exports.cake_get = (req, res) => {
    Cake.find({
        baked: {$gt: new Date(Date.now() - 1000 * 86400 * 4)}
    })
    .then(cakes => {
        cakes = cakes.filter(cake => cake.sold < cake.quantity);
        cakes.forEach(cake => update(cake));
        res.status(200).json(cakes);
    })
    .catch(err => console.log(err));
}

module.exports.cake_post = (req, res) => {
    const cake = new Cake(req.body);
    cake.save()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => console.log(err));
}

module.exports.cake_put = (req, res) => {
    const id = req.params.id;
    Cake.updateOne({_id: id}, {
        name: req.body.name,
        ingredientList: req.body.ingredientList,
        baked: req.body.baked,
        quantity: req.body.quantity,
        sold: req.body.sold,
        price: req.body.price
    })
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => console.log(err));
}

module.exports.cake_delete = (req, res) => {
    const id = req.params.id;
    Cake.findByIdAndDelete(id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => console.log(err));
}
