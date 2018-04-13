var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

    title: {
        type: String,
        required: "Article is required"
    },

    link: {
        type: String,
        trim: true,
        required: "Link is required"
    },

    summary: {
        type: String,
        required: "Summary is required"
    },

    saved: {
        type: Boolean,
        default: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", UserSchema);

// Export the User model
module.exports = Article;
