module.exports = {
    Mutation : {
        createTeam : async (parent, args, { models, user }) =>{
           try {
               return !!(await models.Team.create({...args, owner : user.id}))
           } catch (e) {
               throw e
           }
        }
    }
}