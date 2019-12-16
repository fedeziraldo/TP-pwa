const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const ResetTokenSchema = Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, ref: 'User' 
    },
    resetToken: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200
    }
})

module.exports = mongoose.model('passwordResetToken', ResetTokenSchema)