let express = require("express");
let app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD");
    res.header(
        "Access-Control-Allow-headers",
        "Origin,K-requested-With,Content-Type,Accept");
    next();
});
const port = 2410;
app.listen(port, () => console.log(`Lestening on port ${port} !`));
let { carsData } = require("./carsData.js");
let { carMaster, cars } = carsData;
app.get("/car", function(req, res) {
    let fuel = req.query.fuel;
    let type = req.query.type;
    let sort = req.query.sort;
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    if (minprice) {
        cars = cars.filter((n1) => {
            if (n1.price >= minprice) return n1;
        })
    }
    if (maxprice) {
        cars = cars.filter((n1) => {
            if (n1.price <= minprice) return n1;
        })
    }
    if (sort) {
        switch (sort) {
            case "kms":
                carsData.cars.sort((n1, n2) => n1.kms - n2.kms);
                break;
            case "price":
                carsData.cars.sort((n1, n2) => n1.price - n2.price);
                break;
            case "year":
                carsData.cars.sort((n1, n2) => n1.year - n2.year);
                break;
        }
    }
    res.send(carsData);
});

app.get("/car/:id", function(req, res) {
    let id = req.params.id;

    const data = carsData.carsnpm.find((n1) => n1.id === id);
    res.send(data);
});
app.post("/car", function(req, res) {
    let body = req.body;
    carsData.cars.push(body);
    res.send(carsData);
    console.log(carsData);
});
app.put("/car/:id", function(req, res) {
    let id = req.params.id;
    let body = req.body;
    let index = cars.findIndex((st) => st.id === id);
    if (index >= 0) {
        let updatedCars = {...body };
        cars[index] = updatedCars;
        res.send(carsData);
    } else {
        res.status(404).send("No student found");
    }
});
app.delete("/car/:id", function(req, res) {
    let id = req.params.id;
    let index = carsData.cars.findIndex((st) => st.id === id);
    if (index >= 0) {
        let deleteCars = carsData.cars.splice(index, 1);
        res.send(deleteCars);
    } else {
        res.status(404).send("Not found");
    }

});