import { gql, useQuery } from "@apollo/client";
import React from "react";
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

    const { error, loading, data } = useQuery(GET_ISSUE, {
        variables: { id: issueid },
    });

    if (error) return <p>Error!!!</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            {!error && !loading && data.issue !== undefined && (
                <>
                    <div className="issue-details-wrap">
                        <h3>Issue Details</h3>
                        <table>
                            <tbody>
                                {Object.entries(data.issue).map(
                                    (issueDetail) => {
                                        if (
                                            issueDetail[0] !== "__typename" &&
                                            issueDetail[0] !== "id"
                                        ) {
                                            return (
                                                <tr key={issueDetail[0]}>
                                                    <th>{issueDetail[0]}</th>
                                                    <td>{issueDetail[1]}</td>
                                                </tr>
                                            );
                                        }
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default IssueDetails;
