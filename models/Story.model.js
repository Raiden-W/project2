const storySchema = new Schema ({
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
});

const Story = model("Story", storySchema);
module.exports = Story;