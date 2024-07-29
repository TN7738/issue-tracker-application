import { useEffect, useState } from "react";
import IssueAdd from "./IssueAdd";
import IssueSearch from "./IssueSearch";
import IssueTable from "./IssueTable";
import { gql, useMutation, useQuery } from "@apollo/client";
import IssueFilter from "./IssueFilter";
import { Link } from "react-router-dom";
import { FILTER_ISSUES } from "../mutations/issueMutation";
import { Spinner } from "react-bootstrap";

export const GET_ISSUES = gql`
    query getIssues {
        issues {
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

const IssueList = () => {
    const [filter, setFilter] = useState({
        status: "",
        owner: "",
    });

    const { loading, error, data } = useQuery(GET_ISSUES);

    const [filterIssues] = useMutation(FILTER_ISSUES, {
        variables: {
            status: filter.status,
            owner: filter.owner,
        },
        update: (cache, { data: { filterIssues } }) => {
            cache.writeQuery({
                query: GET_ISSUES,
                data: { issues: filterIssues },
            });
        },
    });

    const handleSearch = (text) => {
        setFilter((currFilter) => ({
            ...currFilter,
            owner: text,
        }));
    };

    const handleFilter = (status) => {
        setFilter((currFilter) => ({
            ...currFilter,
            status: status,
        }));
    };

    useEffect(() => {
        filterIssues();
    }, [filter]);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }
    if (error)
        return (
            <p>
                Error!!! <Spinner animation="grow" variant="danger" />
            </p>
        );

    return (
        <>
            {!loading && !error && (
                <>
                    <div className="d-flex gap-5">
                        <IssueSearch handleSearch={handleSearch} />
                        <IssueFilter handleFilter={handleFilter} />
                    </div>
                    <h2>Issue List</h2>
                    <IssueTable issues={data.issues} />
                </>
            )}
        </>
    );
};

export default IssueList;
