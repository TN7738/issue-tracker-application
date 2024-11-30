import React, { useEffect, useState } from "react";
import IssueTable from "./IssueTable";
import IssueAdd from "./IssueAdd";
import { gql, useMutation, useQuery } from "@apollo/client";
import IssueSearch from "./IssueSearch";
import IssueFilter from "./IssueFilter";
import { FILTER_ISSUES } from "../mutations/issueMutation";
import IssueDelete from "./IssueDelete";

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
    const [deleteIssueId, setDeleteISsueId] = useState("");
    const [filterData, setFilterData] = useState({
        status: "",
        owner: "",
    });

    const { loading, error, data } = useQuery(GET_ISSUES);

    const [filterIssues] = useMutation(FILTER_ISSUES, {
        variables: {
            status: filterData.status,
            owner: filterData.owner,
        },
        update: (cache, { data: { filterIssues } }) => {
            cache.writeQuery({
                query: GET_ISSUES,
                data: { issues: filterIssues },
            });
        },
    });

    const handleSearch = (text) => {
        setFilterData((currFilterData) => ({
            ...currFilterData,
            owner: text,
        }));
    };

    const handleFilter = (status) => {
        console.log("status", status);
        setFilterData((currFilterData) => ({
            ...currFilterData,
            status: status,
        }));
    };

    useEffect(() => {
        filterIssues();
    }, [filterData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!!!</p>;

    return (
        <>
            <div className="d-flex gap-5 mb-5">
                <IssueSearch handleSearch={handleSearch} />
                <IssueFilter handleFilter={handleFilter} />
            </div>
            {!loading && !error && data.issues.length !== 0 && (
                <>
                    <IssueTable
                        issues={data.issues}
                        setDeleteISsueId={setDeleteISsueId}
                    />
                    {deleteIssueId !== "" && (
                        <IssueDelete
                            deleteIssueId={deleteIssueId}
                            setDeleteIssueId={setDeleteISsueId}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default IssueList;
