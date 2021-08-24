module.exports = {
  newNote: async (parent, args, { models }) =>
    await models.Note.create({
      content: args.content,
      author: 'a author str'
    }),
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      // MongooseError [CastError]: Cast to ObjectId failed for value "xxxxxxxx" at path "_id" for model "Note"
      console.log(err);
      return false;
    }
  },
  updateNote: async (parent, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          content
        }
      },
      { new: true }
    );
  }
};
