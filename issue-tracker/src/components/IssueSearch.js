import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const IssueSearch = ({ handleSearch }) => {
    const [text, setText] = useState("");

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(text);
    };

    return (
        <div>
            <form onSubmit={(e) => handleOnSubmit(e)} className="d-flex gap-1">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="rounded border border-dark px-3 py-1"
                    placeholder="Search issues by owner"
                ></input>
                {/* <input type="submit" value="Search"></input> */}
                <Button variant="dark" type="submit">
                    <Search />
                </Button>
            </form>
        </div>
    );
};

export default IssueSearch;
