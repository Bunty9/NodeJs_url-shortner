
const mongoose = require('mongoose');
const shortId = require('shortid')

const Schema = mongoose.Schema;
const UrlSchema = new Schema({
    owner:{ type: mongoose.Schema.Types.ObjectId },
    full: {
        type: String,
        required: true
      },
      short: {
        type: String,
        required: true,
        default: shortId.generate
      },
      clicks: {
        type: Number,
        required: true,
        default: 0
      }
},{
    timestamps: true,
});

const Url = mongoose.model('Url',UrlSchema);

module.exports = Url;
