const mongoose = require("mongoose");
const config = require("config");
const url = config.get("mongoURI");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var connection = mongoose.connection;

connection.once("open", function() {
    connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        } else {
            for (i = 0; i < names.length; i++) {
                console.log(names[i].name);
                if ((names[i].name = "products")) {
                    console.log("Products Collection Exists in DB");
                    connection.db.dropCollection( "products", function(err, result) {
                        }
                    );
                    console.log("products Collection No Longer Available");
                    var myobj = [
                        { productName: "Apple", quantity: 100, zoneNumber:"zone1" },
                        { productName: "chilli", quantity: 100, zoneNumber:"zone1" },
                        { productName: "Potatoes", quantity: 100, zoneNumber: "zone1" },
                    
                        { productName: "freshcutcorns", quantity: 50, zoneNumber: "zone2" },
                        { productName: "greenBeans", quantity: 50, zoneNumber: "zone2" },
                        { productName: "mushroomsoup", quantity: 50, zoneNumber: "zone2" },
                    
                        { productName: "milk", quantity: 40, zoneNumber: "zone3" },
                        { productName: "meat", quantity: 40, zoneNumber: "zone3" },
                        { productName: "cheese", quantity: 30, zoneNumber: "zone3" },
                        ];
                    
                    connection.db.collection("products").insertMany(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("Number of documents inserted: " + res.insertedCount);
                        // connection.db.close();
                    });
                } else {
                    console.log("Collection doesn't exist");
                    var myobj = [
                        { productName: "Apple", quantity: 100, zoneNumber:"zone1" },
                        { productName: "chilli", quantity: 100, zoneNumber:"zone1" },
                        { productName: "Potatoes", quantity: 100, zoneNumber: "zone1" },
                    
                        { productName: "freshcutcorns", quantity: 50, zoneNumber: "zone2" },
                        { productName: "greenBeans", quantity: 50, zoneNumber: "zone2" },
                        { productName: "mushroomsoup", quantity: 50, zoneNumber: "zone2" },
                    
                        { productName: "milk", quantity: 40, zoneNumber: "zone3" },
                        { productName: "meat", quantity: 40, zoneNumber: "zone3" },
                        { productName: "cheese", quantity: 30, zoneNumber: "zone3" },
                        ];
                    
                    connection.db.collection("products").insertMany(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("Number of documents inserted: " + res.insertedCount);
            
                    });
                }
            }
        }
    });
});
