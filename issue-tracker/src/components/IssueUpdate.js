import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ISSUE } from "./IssueDetails";
import { UPDATE_ISSUE } from "../mutations/issueMutation";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import { filters } from "../utils/statusList";

const IssueUpdate = () => {
    const navigate = useNavigate();
    const { issueid } = useParams();

    const { loading, error, data } = useQuery(GET_ISSUE, {
        variables: {
            id: issueid,
        },
    });

    const [issue, setIssue] = useState({});

    const [updateIssue] = useMutation(UPDATE_ISSUE, {
        variables: {
            id: issue.id,
            status: issue.status,
            owner: issue.owner,
            effort: issue.effort,
            created: issue.created,
            due: issue.due,
            title: issue.title,
        },
        update: (cache, { data: { updateIssue } }) => {
            const { issue } = cache.readQuery({
                query: GET_ISSUE,
                variables: { id: issueid },
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
            setIssue({
                id: data.issue.id,
                status: data.issue.status,
                owner: data.issue.owner,
                effort: data.issue.effort,
                created: data.issue.created,
                due: data.issue.due,
                title: data.issue.title,
            });
        }
    }, [data]);

    if (error)
        return (
            <p>
                Error!!! <Spinner animation="grow" variant="danger" />
            </p>
        );

    if (loading) return <Spinner animation="border" variant="primary" />;

    return (
        <>
            {!loading && !error && issue.id !== undefined && (
                <div className="add-issue-wrapper">
                    <h1>IssueAdd</h1>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="p-4 border border-info rounded w-50 d-flex flex-column gap-2"
                    >
                        <div className="form-group">
                            <label htmlFor="status">
                                Status:<span>*</span>
                            </label>
                            {/* <select
                                name="statuses"
                                value={issue.status}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        status: e.target.value,
                                    }))
                                }
                            >
                                <option value=""></option>
                                <option value="New">New</option>
                                <option value="Pending">Pending</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Completed">Completed</option>
                            </select> */}

                            <Dropdown variant="secondary">
                                <Dropdown.Toggle variant="secondary">
                                    {issue.status ? issue.status : "Status"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {filters.map((option) => (
                                        <Dropdown.Item
                                            href=""
                                            onClick={() =>
                                                setIssue((currSetIssue) => ({
                                                    ...currSetIssue,
                                                    status: option,
                                                }))
                                            }
                                            active={issue.status === option}
                                        >
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner">
                                Owner:<span>*</span>
                            </label>
                            <input
                                id="owner"
                                type="text"
                                className="form-control"
                                value={issue.owner}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        owner: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="effort">
                                Effort:<span>*</span>
                            </label>
                            <input
                                id="effort"
                                type="number"
                                className="form-control"
                                value={issue.effort}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        effort: parseInt(e.target.value),
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="created">
                                Created:<span>*</span>
                            </label>
                            <input
                                id="created"
                                type="date"
                                className="form-control"
                                value={issue.created}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        created: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="due">Due:</label>
                            <input
                                id="due"
                                type="date"
                                className="form-control"
                                value={issue.due}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        due: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">
                                Title:<span>*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="form-control"
                                value={issue.title}
                                onChange={(e) =>
                                    setIssue((currIssue) => ({
                                        ...currIssue,
                                        title: e.target.value,
                                    }))
                                }
                            ></input>
                        </div>
                        <Button
                            variant="dark"
                            type="submit"
                            className="submit-btn"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
};

export default IssueUpdate;
