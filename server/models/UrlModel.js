const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
},
{timestamps: true},
);

const ShortUrl = model('ShortUrl', urlSchema);

module.exports = ShortUrl;