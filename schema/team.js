module.exports = `
    type Team {
        id: Int!
        name: String!
        members: [User!]!
        channels: [Channel]!
    }

    type createTeamResponse {
        success: Boolean!
        errors: [Error!]
    }

    type Query {
        allTeams: [Team!]!
    }
    
    type Mutation {
        createTeam(name: String!) : createTeamResponse!
    }
`;
