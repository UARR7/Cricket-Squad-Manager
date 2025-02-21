const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://capt4001:Akash@bigdata.r6mdr.mongodb.net/?retryWrites=true&w=majority&appName=bigdata';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;