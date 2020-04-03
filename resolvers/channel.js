module.exports = {
    Mutation:{
        createChannel: async(parent, args, {models}) => {
            try {
                return !!(await models.Channel.create(args))

            }catch (e) {
                throw e
            }
        }
    }
}