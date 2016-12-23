var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;


var ChirpSchema = new Schema({
    chirp: { type: String, required: true}, 			
    chirpAuthor: { type: Schema.Types.ObjectId, required: true, ref:'User'},       
    dateCreated: {type: Date, default: Date.now},
    likes: {type: Number, default:0},
    rechirp: {type: Boolean, default: false}      
  
});
 
 module.exports = Mongoose.model('Chirp', ChirpSchema);
