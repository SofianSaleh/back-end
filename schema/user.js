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
        createUser(username:String!, email: String!, password: String!) : User!
    }
    
`