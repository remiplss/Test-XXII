var mongoose = require('mongoose');
var Schema = mongoose.Schema;

videoSchema = new Schema( {
	name: String,
	desc: String,
	image: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
video = mongoose.model('video', videoSchema);

module.exports = video;