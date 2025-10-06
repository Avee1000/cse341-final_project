const db = require('../models');
const Classification = db.classification;
const Cars = db.cars;
const User = db.users;
const Suggestion = db.suggestions;
const mongoose = require('mongoose');

const invCont = {};

// Build form for creating cars
invCont.buildCreateCars = async (req, res, next) => {
    try {
        const classifications = await Classification.find({});
        res.render("account/add", {
            title: "Create Contact",
            classifications,
            errors: null
        });
    } catch (error) {
        console.error("🔥 Error building create cars form:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Build form for editing cars
invCont.buildEditCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const classifications = await Classification.find({});
        const car = await Cars.findById(id);

        if (!car) {
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.render("inventory/edit-cars", {
            title: "Edit Cars",
            errors: null,
            _id: car._id,
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            miles: car.miles,
            color: car.color,
            description: car.description,
            image: car.images.main,
            thumbnail: car.images.thumbnail,
            classifications
        });
    } catch (error) {
        console.error("🔥 Error building edit cars form:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Get one car
invCont.getOneCar = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const car = await Cars.findById(id);
        if (!car) {
            res.status(404).send("Car Not Found");
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error("🔥 Error fetching car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Get all cars
invCont.getAllCars = async (req, res, next) => {
    try {
        const cars = await Cars.find({});
        if (!cars || cars.length === 0) {
            res.status(404).send("No Cars Found");
            return next({
                status: 404,
                message: "No Cars Found"
            });
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error("🔥 Error fetching all cars:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

invCont.getAllClassifications = async (req, res, next) => {
    try {
        const classifications = await Classification.find({});
        if (!classifications || classifications.length === 0) {
            res.status(400).send("No Classifications Found");
            return next({
                status: 400,
                message: "No Classifications Found"
            });
        }
        res.status(201).json(classifications);
    } catch (error) {
        console.error("🔥 Error fetching all classifications:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

// Create a new car
invCont.createCars = async (req, res, next) => {
    try {
        const {
            make,
            model,
            year,
            description,
            price,
            miles,
            color,
            classification
        } = req.body;

        const newCar = {
            make,
            model,
            year,
            description,
            "images.main": "/images/no-image.png",
            "images.thumbnail": "/images/no-image-tn.png",
            price,
            miles,
            color,
            classification
        }

        const car = await Cars.create(newCar);
        if (!car) {
            res.status(400).send("Cannot Create Car");
            return next({
                status: 500,
                message: "Server Error"
            });
        }

        res.status(201).json(car);
    } catch (error) {
        console.error("🔥 Error creating car:", error);
        res.status(400).send(error);
        next({
            status: 500,
            message: error
        });
    }
};

invCont.createClassification = async (req, res, next) => {
    try {
        const {
            name,
            description
        } = req.body;
        const classification = await Classification.create({
            name,
            description
        });
        if (!classification) {
            res.status(400).send("Cannot Create Classification");
            return next({
                status: 500,
                message: "Server Error"
            });
        }

        res.status(201).json(classification);
    } catch (error) {
        console.error("🔥 Error creating classification:", error);
        res.status(400).send(`${error}`);

        next({
            status: 500,
            message: "Server Error"
        });
    }
}

// Edit car
invCont.editCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const {
            make,
            model,
            year,
            description,
            image,
            imageThumbnail,
            price,
            miles,
            color,
            classification
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const result = await Cars.findByIdAndUpdate(
            id, {
                $set: {
                    make,
                    model,
                    year,
                    description,
                    "images.main": image,
                    "images.thumbnail": imageThumbnail,
                    price,
                    miles,
                    color,
                    classification
                }
            }, {
                new: true
            }
        );

        if (!result) {
            res.status(500).send("Server Error");
            return next({
                status: 404,
                message: "Car Not Found"
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("🔥 Error updating car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

invCont.editClassification = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            description
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Classification ID");
            return next({
                status: 400,
                message: "Invalid Classification ID"
            });
        }

        const result = await Classification.findByIdAndUpdate(
            id, {
                $set: {
                    name,
                    description
                }
            }, {
                new: true
            }
        );

        if (!result) {
            res.status(400).send("Cannot edit classification");
            return next({
                status: 404,
                message: "Classification Not Found"
            });
        }

        res.status(201).json(result);
    } catch (error) {
        console.error("🔥 Error updating classification:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
}
// Delete car
invCont.deleteCars = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Car ID");
            return next({
                status: 400,
                message: "Invalid Car ID"
            });
        }

        const car = await Cars.findByIdAndDelete(id);
        if (!car) {
            return next({
                status: 400,
                message: "Car Not Found"
            });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error("🔥 Error deleting car:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

invCont.deleteClassification = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid Classification ID");
            return next({
                status: 400,
                message: "Invalid Classification ID"
            });
        }

        const classification = await Classification.findByIdAndDelete(id);
        if (!classification) {
            return next({
                status: 400,
                message: "Classification Not Found"
            });
        }

        res.status(200).json(classification);
    } catch (error) {
        console.error("🔥 Error deleting classification:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
};

invCont.getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find({});

        if (!users) {
            res.status(400).json("No users found");
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(`${error}`)
    }

}

invCont.editUsers = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        
        const {
            username,
            displayName,
            email
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send("Invalid User ID");
            return next({
                status: 400,
                message: "Invalid User ID"
            });
        }

        const result = await User.findByIdAndUpdate(
            id, {
            $set: {
                username: username,
                displayName: displayName,
                email: email
            }
        }, {
            new: true
        }
        );

        if (!result) {
            res.status(400).send("Cannot edit user");
            return next({
                status: 404,
                message: "User Not Found"
            });
        }

        res.status(201).json(result);
    } catch (error) {
        console.error("🔥 Error updating user:", error);
        next({
            status: 500,
            message: "Server Error"
        });
    }
}

invCont.getAllSuggestions = async (req, res, next) => {
    try {
        const result = await Suggestion.find({});

        if (!result) {
            res.status(400).json("No suggestions found");
        }   

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`${error}`);
        console.error(`${error}`);
    }
}

invCont.createSuggestion = async (req, res, next) => {
    try {
        const {
            suggestion
        } = req.body;

        const result = await Suggestion.create({
            githubId: req.session.user.id,
            suggestion: suggestion
        });

        if (!result) {
            res.status(400).json("Cannot create suggestion");
            return next({
                status: 404,
                message: "Suggestion Not Found"
            });
        }

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(`${error}`);
        console.error(`${error}`);
    }
}

module.exports = invCont;