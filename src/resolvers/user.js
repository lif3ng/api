module.exports = {
  notes: async (user, args, { models }) =>
    await models.Note.find({ author: user._id }),
  favorites: async (user, args, { models }) =>
    await models.Note.find({ favoritedBy: user._id })
};
