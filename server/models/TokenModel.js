const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true},
});

const Token = model('Token', tokenSchema);

module.exports = Token;