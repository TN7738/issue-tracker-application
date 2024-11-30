import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_ISSUE } from "../mutations/issueMutation";
import { GET_ISSUES } from "./IssueList";

const IssueDelete = ({ deleteIssueId, setDeleteIssueId }) => {
    const [deleteIssue] = useMutation(DELETE_ISSUE, {
        variables: {
            id: deleteIssueId,
        },
        update: (cache, { data: { deleteIssue } }) => {
            const { issues } = cache.readQuery({
                query: GET_ISSUES,
            });
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

    const handleYesClick = () => {
        deleteIssue();
        setDeleteIssueId("");
    };

    return (
        <div className="delete-wrap">
            <div className="inner-wrap">
                <h4>Are you sure?</h4>
                <div className="btn-wrap">
                    <button onClick={handleYesClick}>Yes</button>
                    <button onClick={() => setDeleteIssueId("")}>No</button>
                </div>
            </div>
        </div>
    );
};

export default IssueDelete;
