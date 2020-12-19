const unpublicUser = async (doc) => {
  await doc.populate("user").execPopulate();
  doc.toObject({ getters: true });
  doc.user.token = undefined;
  doc.user.password = undefined;
  await doc.save();
};

module.exports = unpublicUser;
