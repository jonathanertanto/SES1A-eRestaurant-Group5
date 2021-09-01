const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true}
  // email: { type: String, required: true, unique: true},
  // first_name: { type: String, required: true},
  // last_name: { type: String},
  // date_of_birth: {type: Date},
  // contact_number: {type: String}

}, {collection: 'users'})

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model
