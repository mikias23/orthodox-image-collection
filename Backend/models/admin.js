const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({

    password: {
        type: String, 
        required:true
    },

    phone:{
        type: String, 
         required:[true, 'Please add a phone'],

    },
    email: {
        type: String, 
        required:[true, 'Please add email'],
    }
}
)

module.exports = mongoose.model('Admin', adminSchema);
