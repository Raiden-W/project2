const { Schema, model } = require('mongoose')
const storySchema = new Schema({

    text: {
        type: String,
        required: true,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Nostalgic item',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},
    // this second object adds extra properties: `createdAt` and `updatedAt`  
    {
        timestamps: true,
    }
)



const Story = model("Story", storySchema)
module.exports = Story