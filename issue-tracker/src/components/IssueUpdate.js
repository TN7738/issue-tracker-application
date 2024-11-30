import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_ISSUE } from "./IssueDetails";
import { UPDATE_ISSUE } from "../mutations/issueMutation";

const IssueUpdate = () => {
    const [issueDetails, setIssueDetails] = useState({
        status: "",
        effort: 0,
        owner: "",
        created: "",
        due: "",
        title: "",
    });

    const { issueid } = useParams();
    const navigate = useNavigate();

    const { error, loading, data } = useQuery(GET_ISSUE, {
        variables: {
            id: issueid,
        },
    });

    const [updateIssue] = useMutation(UPDATE_ISSUE, {
        variables: {
            id: issueid,
            status: issueDetails.status,
            owner: issueDetails.owner,
            effort: issueDetails.effort,
            created: issueDetails.created,
            due: issueDetails.due,
            title: issueDetails.title,
        },
        update: (cache, { data: updateIssue }) => {
            const { issue } = cache.readQuery({
                query: GET_ISSUE,
                variables: {
                    id: issueid,
                },
            });
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue },
            });
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateIssue();
        navigate("/issuelist");
    };

    useEffect(() => {
        if (data && "issue" in data) {
            setIssueDetails({
                status: data.issue.status,
                effort: data.issue.effort,
                owner: data.issue.owner,
                created: data.issue.created,
                due: data.issue.due,
                title: data.issue.title,
            });
        }
    }, [data]);

    if (error) {
        return <p>Error!!!</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {!loading && !error && data.issue !== undefined && (
                <>
                    <h4>Update Issue</h4>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="status">Status:</label>
                            <input
                                type="text"
                                id="status"
                                name="status"
                                value={issueDetails.status}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        status: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="owner">Owner:</label>
                            <input
                                type="text"
                                id="owner"
                                name="owner"
                                value={issueDetails.owner}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        owner: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="effort">Effort:</label>
                            <input
                                type="number"
                                id="effort"
                                name="effort"
                                value={issueDetails.effort}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        effort: parseInt(e.target.value),
                                    }))
                                }
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="created">Created:</label>
                            <input
                                type="date"
                                id="created"
                                name="created"
                                value={issueDetails.created}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        created: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="due">Due:</label>
                            <input
                                type="date"
                                id="due"
                                name="due"
                                value={issueDetails.due}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        due: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={issueDetails.title}
                                onChange={(e) =>
                                    setIssueDetails((currIssueDetails) => ({
                                        ...currIssueDetails,
                                        title: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <input type="submit" value="Save" />
                    </form>
                </>
            )}
        </>
    );
};

export default IssueUpdate;
