export const types = `#graphql  

    input createEmployee {
        email: String!
        name: String! 
        linkedInProfile: String!
        profileImageUrl: String
        aadharNumber: Int!
        password: String!
    }

    type Employee {
        id: ID!
        name:String!
        email: String!
        LinkedinProfile: String
        ProfileImageUrl: String   
        aadharNumber: String!
    }
`