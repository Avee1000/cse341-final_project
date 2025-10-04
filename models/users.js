module.exports = (mongoose) => {
    const Users = mongoose.model(
        'users',
        mongoose.Schema({
            githubId: {
                type: String,
                required: true,
                unique: true // no duplicates like "Sports Car" twice
            },
            username: {
                type: String
            },
            displayName: {
                type: String
            },
            email: {
                type: String
            }
        }, {
            timestamps: true
        })
    );

    return Users;
};