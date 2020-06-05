module.exports = `
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
        messages: [Message!]!
        user: [User!]!
    }
    
    type ChannelResponse {
        success: boolean!
        channel: Channel
        errors: [Error!]
    }

    type Mutation {
        createChannel(teamId: Int!, name: String!, public: Boolean=false) : ChannelResponse!
    }
`;
