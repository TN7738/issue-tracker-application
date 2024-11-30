import { gql } from "@apollo/client";

export const ADD_ISSUE = gql`
    mutation addIssue(
        $status: String!
        $owner: String!
        $effort: Int!
        $created: Date!
        $due: Date
        $title: String!
    ) {
        addIssue(
            status: $status
            owner: $owner
            effort: $effort
            created: $created
            due: $due
            title: $title
        ) {
            id
            status
            owner
            effort
            created
            due
            title
        }
    }
`;

export const FILTER_ISSUES = gql`
    mutation filterIssues($status: String, $owner: String) {
        filterIssues(status: $status, owner: $owner) {
            id
            status
            owner
            effort
            created
            due
            title
        }
    }
`;

export const UPDATE_ISSUE = gql`
    mutation updateIssue(
        $id: ID!
        $status: String!
        $owner: String!
        $effort: Int!
        $created: Date!
        $due: Date
        $title: String!
    ) {
        updateIssue(
            id: $id
            status: $status
            owner: $owner
            effort: $effort
            created: $created
            due: $due
            title: $title
        ) {
            id
            status
            owner
            effort
            created
            due
            title
        }
    }
`;

export const DELETE_ISSUE = gql`
    mutation deleteIssue($id: ID!) {
        deleteIssue(id: $id) {
            id
            status
            owner
            effort
            created
            due
            title
        }
    }
`;
