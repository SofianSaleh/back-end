module.exports = `
    type User {
        id: Int!
        username: String!
        email: String! 
    }
    
    type Query {
        getUser(id: Int!): User!
        getAllUsers: [User!]!
    }
    
    type Mutation {
        register(username:String!, email: String!, password: String!) : Boolean!
    }
    
`