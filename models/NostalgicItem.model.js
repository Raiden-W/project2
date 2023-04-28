const { Schema, model } = require('mongoose')

const nostalgicItem = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    imgUrl: {
      type: [String],
      required: true,
    },
    shortInfo: {
      type: String,
      Default: 'Feel kind of nostalgic huh?',
    },
    longInfo: {
      type: String,
      Default: `Nostalgia is associated with a longing for the past, its personalities, possibilities, and events, especially the "good ol' days" or a "warm childhood". There is a predisposition, caused by cognitive biases such as rosy retrospection, for people to view the past more favourably and future more negatively. When applied to one's beliefs about a society or institution, this is called declinism, which has been described as "a trick of the mind" and as "an emotional strategy", something comforting to snuggle up to when the present day seems intolerably bleak`,
    },
    collectedBy: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
)

const NostalgicItem = model('Nostalgic item', nostalgicItem)

module.exports = NostalgicItem
