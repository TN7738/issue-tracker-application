import React from "react";
import { Link } from "react-router-dom";

const IssueRow = ({ style, issue, setDeleteISsueId }) => {
    return (
        <tr>
            {Object.entries(issue).map((entry) => {
                if (entry[0] !== "__typename" && entry[0] !== "id") {
                    let value = entry[1];
                    if (entry[0] === "created" || entry[0] === "due") {
                        value = entry[1] ? entry[1] : "Not Defined";
                    }
                    return (
                        <td key={entry[0]} style={style}>
                            {value}
                        </td>
                    );
                }
            })}
            <td style={style}>
                <button>
                    <Link to={`/issuelist/${issue.id}`}>Details</Link>
                </button>
            </td>
            <td style={style}>
                <button>
                    <Link to={`/issuelist/update/${issue.id}`}>Edit</Link>
                </button>
            </td>
            <td style={style}>
                <button onClick={() => setDeleteISsueId(issue.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default IssueRow;
