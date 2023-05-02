const { Schema, model } = require('mongoose')
const profile = new Schema(
  {
    picUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/duo0ik2tp/image/upload/v1682958685/default-profile-pic_qmwhbo.jpg',
    },
    oldPicFilename: String,
    intro: {
      type: String,
      default: 'The user does not have any introduction.',
    },
    birth: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const Profile = model('Profile', profile)
module.exports = Profile
