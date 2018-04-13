var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: "Article is required"
    },

    link: {
        type: String,
        trim: true,
        unique: true,
        required: "Link is required"
    },

    summary: {
        type: String,
        unique: true,
        required: "Summary is required"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the User model
module.exports = Article;
