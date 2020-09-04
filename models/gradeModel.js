export default (mongoose) => {
	const schema = mongoose.Schema({
		name: { type: String, required: true },
		subject: { type: String, required: true },
		type: { type: String, require: true },
		value: { type: Number, required: true, min: 0 },
		lastModified: { type: Date, required: true },
	});

	schema.method('toJSON', function () {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	const gradeModel = mongoose.model('grade', schema, 'grade');

	return gradeModel;
};
