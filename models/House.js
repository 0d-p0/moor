const mongoose = require('mongoose')


const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rooms: [{
    name: {
      type: String,
      required: [true, "please enter a room name"]
    },
    price: {
      type: Number,
      required: [true, "please add some price"]

    },
    photos: [{
      type: String,
      required: [true, "please add some photos"]
    }],

    // img:{data:Buffer,contentType: String},

    roomSlots: {
      type: Number,
      required: [true, "please add bed`s numbers"]

    },
    description: {
      type: String,
      default: "landlord does not provide any description"

    },
    // presentRenter: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User"
    // },

  }],

  pictures: [{
    type: String,
    required: [true, "please upload one picture"]
  }],

  // location: {
  //   type: String,
  //   required: [true, "please enter location"]
  // },

  loc: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      default:'Point'
    },
    coordinates: {
      type: [Number],
      required:[ true,'please add coordinate']
    }
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

houseSchema.index({loc:'2dsphere'})

module.exports = mongoose.model("Home", houseSchema)