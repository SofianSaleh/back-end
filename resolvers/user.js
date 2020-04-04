const bcrypt = require('bcryptjs');

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
        register: async(parent, {password, ...otherArgs}, { models }) =>{
            try {
                const hashedPassword = await bcrypt.hash(password,12)
                return !!(await models.User.create({...otherArgs, password:hashedPassword}))
            }catch (e) {
                throw e
            }
            return await models.User.create(args)

        }

    }

}