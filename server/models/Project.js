const mongoose = require("mongoose");

// create mongoose Schema 
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

// Export Schema as mongooose model
module.exports = mongoose.model("Project", ProjectSchema);
