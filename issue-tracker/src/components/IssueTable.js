import React from "react";
import IssueRow from "./IssueRow";
import { Table } from "react-bootstrap";

const IssueTable = ({ issues, setDeleteISsueId }) => {
    const rowStyle = {
        border: "solid 1px silver",
        padding: "4px",
    };

    const issueRows = issues.map((issue) => (
        <IssueRow
            key={issue.id}
            style={rowStyle}
            issue={issue}
            setDeleteISsueId={setDeleteISsueId}
        />
    ));

    return (
        <>
            <h3>IssueTable</h3>
            <Table striped hover variant="dark">
                <thead>
                    <tr className="text-capitalize">
                        {Object.keys(issues[0]).map((key) => {
                            if (key !== "__typename" && key !== "id") {
                                return (
                                    <th key={key} style={rowStyle}>
                                        {key}
                                    </th>
                                );
                            }
                        })}
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </Table>
        </>
    );
};

export default IssueTable;
