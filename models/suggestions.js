module.exports = (mongoose) => {
  const Suggestion = mongoose.model(
    'suggestions',
    mongoose.Schema({
      githubId: {
        type: String,
        required: true,
      },
      suggestion: {
        type: String
      }
    }, {
      timestamps: true
    })
  );

  return Suggestion;
};