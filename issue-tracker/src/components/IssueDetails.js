import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const GET_ISSUE = gql`
    query getIssue($id: ID!) {
        issue(id: $id) {
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

const IssueDetails = () => {
    const { issueid } = useParams();

    const { loading, error, data } = useQuery(GET_ISSUE, {
        variables: { id: issueid },
    });

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error)
        return (
            <p>
                Error!!! <Spinner animation="grow" variant="danger" />
            </p>
        );

    return (
        <>
            {!loading && !error && (
                <div className="issue-details-wrap">
                    <h3>Issue Details</h3>
                    <Table striped hover variant="dark" className="w-50">
                        <tbody>
                            {Object.entries(data.issue).map((issueDetails) => {
                                if (
                                    issueDetails[0] !== "__typename" &&
                                    issueDetails[0] !== "id"
                                ) {
                                    return (
                                        <tr key={issueDetails[0]}>
                                            <th>{issueDetails[0]}</th>
                                            <td>{issueDetails[1]}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};

export default IssueDetails;
