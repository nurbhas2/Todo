var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
    Bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    firstName: { type: String, required: true}, 			// Required validation
    lastName: { type: String, required: true},              // Required validation
    screenName: { type: String, required: true },           // Required validation
    email: { type: String, unique:true, required: true },  // Match validation regex
    password: { type: String, required: true },             // Required validation
    dateRegistered: { type: Date, default: Date.now },      // Default to Current Date 
    follow: [{ type: Schema.Types.ObjectId, ref: 'User'}]   // Reference User to the schema Types
});
UserSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

 UserSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) { 
       Bcrypt.genSalt(10, function (err, salt) {
            if (err) { 
               return next(err); 
           }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else { 
       return next();
    }
});
module.exports = Mongoose.model('User', UserSchema);
