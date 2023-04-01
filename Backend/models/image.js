const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
    {
      description: {
        type: String, 
    },
    imagePath:{
        type:Array,
        required:true
    }
    , 
    imageType:{
        type: String, 
               required:[true, 'class required'],

    },
    city: {
        type:String
    },
    name: {
        type:String,
        required:[true, 'class required'],

    }
    ,
    location: {
        type:String

    },

},
{
    timestamps:true,
}
)

module.exports = mongoose.model('Image', imageSchema);
