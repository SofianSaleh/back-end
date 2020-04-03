module.exports = `
 type Team {
        id: Int!
        name: String!
        members: [User!]!
        channels: Channel!
    }
    
    type Mutation {
        createTeam(name: String!) : Boolean!
    }
`