const express = require('express')
const app = express()
const moment = require('moment')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

var config = {
    username:'diningTrace',
    host:'EuTfDnPSyiAjZIohwObo@diningtrace.cluster-ciwnltsxqdvs.eu-central-1.docdb.amazonaws.com',
    agent : process.env.SSH_AUTH_SOCK,
    privateKey:require('fs').readFileSync('/Users/myusername/.ssh/id_rsa'),
    port:22,
    dstPort:27017,
    password:'mypassword'
};

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
 function(error, client) {
    const databse = client.db("tracy");
    const orders = databse.collection('orders')

    if (error) {
        console.log(error);
    } else {
        console.log("DB connected");
    }

    // Adds order for restaurant to orders collection  
    app.post("/addOrder", function(req, res) {

        var orderData = {
            restaurantId: req.body.restaurantId,
            diningTime: req.body.diningTime,
            customers: req.body.customers
        }

        orders.insertOne(orderData, (error, document) => {
            if(error) return next(error);
            console.log("Order insertion success")
            return res.status(200).send(true)
        })

    });

    // Returns all orders on database
    
    app.get("/orders", function(req, res) {

        var cursor = orders.find();
        var orderResults = [];

        cursor.forEach(function(doc, err) {
            if (err) return res.statusCode(503).send;
            orderResults.push(doc);
        }, function() {
             client.close()
            return res.json(orderResults)
        });

    });

    ///orders/restaurantId/?fromTime=datetime&toTime=datetime


    app.get("/searchDiningTime", function(req, res) {

        const restaurantId = req.query.restaurantId
        const fromTime = req.query.fromTime
        const toTime = req.query.toTime
        const query = {restaurantId: restaurantId}

        orders.find(query).toArray(function(error, docs) {
            if(error) return next(error);

            const dateFomat = 'YYYY-MM-DDTHH:mm:ssZ'

            var retreivedTimes = [];

             docs.forEach( (doc, index) => {
                console.log(doc.diningTime, "dining time");
                console.log(fromTime, "from time");
                console.log(toTime, "to time");

                const diningMoment = moment(doc.diningTime).format(dateFomat)
                const fromTimeMoment = moment(fromTime).format(dateFomat)
                const toTimeMoment = moment(toTime).format(dateFomat)
                const fallsWithinContactDate = moment(diningMoment, dateFomat).isBetween(fromTimeMoment, toTimeMoment)

                console.log(fallsWithinContactDate)

                if (fallsWithinContactDate) {
                    retreivedTimes.push(doc)
                }
            })
            return res.json(retreivedTimes)
          });

    });

    // Returns all orders for restaurant with restaurantId as query param
    app.get("/restaurantOrders", function(req, res) {
        const restaurantId = req.query.restaurantId
        const query = {restaurantId: restaurantId}

        orders.find(query).toArray(function(error, docs) {
            console.log(docs);
            if(error) return next(error);
            return res.json(docs)
          });

    });

    app.listen(3000, function() {
        console.log("Server Connected");
    })
}) 
