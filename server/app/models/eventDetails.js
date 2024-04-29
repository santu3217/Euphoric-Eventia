import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    createdBy: {
        type: String,
        // required: true
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDate: {
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        }
    },
    eventLocation: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode:{
            type:Number,
            required:true
        },
        state: {
            type:String,
            required:true
        },
    },
    eventCategory: {
        type: String,
        required: true
    },
    isEventFree: {
        type: Boolean
    },
    eventCost: {
        type: Number,
        required: true
    },
    eventCapacity: {
        type: Number,
        required: true
    },
    eventImage: {
        imageName: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }
    }

}, {
    versionKey: false
})

const eventModel = mongoose.model('eventDetails', eventSchema);

export default eventModel;