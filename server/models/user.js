const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },{
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  const user = this, SALT_FACTOR = 5;
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    };
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      };
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if(err) {cb(err);}
    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema);
