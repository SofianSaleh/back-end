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
    type registerResponse {
        success: Boolean!,
        user: User
        errors: [Error!],
    }
    
    type Mutation {
        register(username:String!, email: String!, password: String!) : registerResponse!
    }
     
`;
