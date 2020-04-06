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
        success: Boolean!
        user: User
        errors: [Error!]
    }
    
    type loginResponse {
        success: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
    }

    type Mutation {
        register(username:String!, email: String!, password: String!) : registerResponse!
        login(email: String!, password: String!) : loginResponse!

    }
     
`;
