const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    UserEmail : {type : String, required: true},
    firstName : {type : String, required: true},
    lastName : {type : String, required: true},
    phoneNumber : {type : Number, required: true},
    email : {type : String, required: true},
    city : {type : String, required: true},
    address : {type : String, required: true},
    propertyHeading : {type : String, required: true},
    area : {type : String, required: true},
    price: {type: Number, required: true},
    BHKinfo : {type : String, required: true},
    noOfBedroom : {type : Number, required: true},
    noOfHall : {type : Number, required: true},
    noOfKitchen : {type : Number, required: true},
    noOfBalcony : {type : Number, required: true},
    furinishing : {type : String, required: true},
    parking : {type : String, required: true},
    sellingType : {type : String, required: true},
    security : {type : String, required: true},
    postedBy : {type : String, required: true},
    propertyDecription : {type : String, required: true},
    coverImg : {type : Array, required: true},
    propertyImg : {type : Array, required: true}
    
    
    
}, {timestamps: true});

// mongoose.models = {};
export default mongoose.models.property || mongoose.model("property", propertySchema);
// export default mongoose.model("property", propertySchema);