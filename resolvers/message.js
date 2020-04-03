module.exports = {
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
            try {
                return !! (await models.Message.create({...args, userId: user.id}))
            }catch (e) {
                throw e
            }
        }

    }
}