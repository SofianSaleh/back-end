module.exports = {
    Query : {
        getUser : async (parent, {id}, { models })=>{
           return await models.User.findByPk(id)
        },
        getAllUsers : async (parent, args, { models }) =>{
           return await models.User.findAll()
        }
    },
    Mutation:{
        createUser: async(parent, args, { models }) =>{
            return await models.User.create(args)

        }

    }

}