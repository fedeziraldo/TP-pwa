const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb://' + process.env.MONGO_DB_HOST + '/' + process.env.MONGO_DB_DB, { useNewUrlParser: true }, function (err) {
   if (err) {
      throw err;
   } else {
      console.log('Conectado a MongoDB');
   }
});

mongoosePaginate.paginate.options = {
   lean: true,
   limit: process.env.MONGO_DB_LIMIT
};
mongoose.mongoosePaginate = mongoosePaginate

module.exports = mongoose; 
