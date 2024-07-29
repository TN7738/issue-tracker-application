import React from "react";
import { Button } from "react-bootstrap";

const DeleteConfirmation = ({ deleteIssue, setDeleteIssueId }) => {
    const handleYesClick = () => {
        deleteIssue();
        setDeleteIssueId("");
    };

    const handleNoClick = () => {
        setDeleteIssueId("");
    };

    return (
        <div className="position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 d-flex align-items-center justify-content-center">
            <div className="p-4 rounded bg-white opacity-100">
                <h4>Are you sure you want to delete?</h4>
                <div className="d-flex justify-content-center pt-3 gap-4">
                    <Button
                        variant="primary"
                        className="w-25"
                        onClick={handleYesClick}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="danger"
                        className="w-25"
                        onClick={handleNoClick}
                    >
                        No
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
