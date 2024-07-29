import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Pencil, ThreeDotsVertical, Trash } from "react-bootstrap-icons";

const IssueRow = ({ rowStyle, issue, setDeleteIssueId }) => {
    return (
        <tr>
            {Object.entries(issue).map((value) => {
                if (value[0] !== "__typename" && value[0] !== "id") {
                    return (
                        <td key={value[0]} style={rowStyle}>
                            {value[1]}
                        </td>
                    );
                }
            })}
            <td style={rowStyle}>
                <Button variant="secondary">
                    <Link to={`/issuelist/${issue.id}`}>
                        <ThreeDotsVertical color="white" />
                    </Link>
                </Button>
            </td>
            <td style={rowStyle}>
                <Button variant="info">
                    <Link to={`/issuelist/update/${issue.id}`}>
                        <Pencil color="black" />
                    </Link>
                </Button>
            </td>
            <td style={rowStyle}>
                <Button
                    variant="danger"
                    onClick={() => setDeleteIssueId(issue.id)}
                >
                    <Trash />
                </Button>
            </td>
        </tr>
    );
};

export default IssueRow;
