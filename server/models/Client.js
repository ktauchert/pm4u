const mongoose = require("mongoose");

// create mongoose Schema 
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

// Export Schema as mongooose model
module.exports = mongoose.model("Client", ClientSchema);
