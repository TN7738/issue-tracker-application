import { Table } from "react-bootstrap";
import IssueRow from "./IssueRow";
import DeleteConfirmation from "./DeleteConfirmation";
import { useMutation } from "@apollo/client";
import { DELETE_ISSUE } from "../mutations/issueMutation";
import { GET_ISSUES } from "./IssueList";
import { useState } from "react";

const IssueTable = ({ issues }) => {
    const [deleteIssueId, setDeleteIssueId] = useState("");

    const [deleteIssue] = useMutation(DELETE_ISSUE, {
        variables: { id: deleteIssueId },
        update: (cache, { data: { deleteIssue } }) => {
            const { issues } = cache.readQuery({ query: GET_ISSUES });
            cache.writeQuery({
                query: GET_ISSUES,
                data: {
                    issues: issues.filter(
                        (issue) => issue.id !== deleteIssue.id
                    ),
                },
            });
        },
    });

    if (issues.length === 0) {
        return <></>;
    }

    const rowStyle = { border: "1px solid silver", padding: 4 };

    const issueRows = issues.map((issue) => (
        <IssueRow
            key={issue.id}
            rowStyle={rowStyle}
            issue={issue}
            setDeleteIssueId={setDeleteIssueId}
        />
    ));
    return (
        <>
            <Table striped hover variant="dark">
                <thead>
                    <tr>
                        {Object.keys(issues[0]).map((title) => {
                            if (title !== "__typename" && title !== "id") {
                                return (
                                    <th
                                        key={title}
                                        style={rowStyle}
                                        className="fw-bold text-center text-capitalize"
                                    >
                                        {title}
                                    </th>
                                );
                            }
                        })}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </Table>
            {deleteIssueId && (
                <DeleteConfirmation
                    deleteIssue={deleteIssue}
                    setDeleteIssueId={setDeleteIssueId}
                />
            )}
        </>
    );
};

export default IssueTable;
