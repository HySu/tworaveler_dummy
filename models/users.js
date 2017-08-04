// users.js
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var db = require('./db');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	user_no: {type: Number, ref: 'user_no' },
	email: String,
	pw: String,
	nickname: String,
	followers: Array,
	followees: Array,
	profile_pic_url: { type: String, default: '' },
	profile_pic_thumbnail_url: { type: String, default: '' },
	status_message: { type: String, default: '' },
	reg_date: { type:Date, default: Date.now },
	del_yn: { type: String, default: 'N' }
});

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'user_no' });

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;