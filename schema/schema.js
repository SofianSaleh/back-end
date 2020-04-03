const { gql } = require('apollo-server-express/dist/index');

module.exports = gql`

    type Team {
        id: Int!
        members: [User!]!
        channels: Channel!
    }
    
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
        messages: [Message!]!
        user: [User!]!
    }

    type Message {
        id: Int!
        text:String!
        user: User!
        channel: Channel!
    }
    
    type User {
        id: Int!
        username: String!
        email: String! 
    }
    
    type Query {
        hello: String
    }
`