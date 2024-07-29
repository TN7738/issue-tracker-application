import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { filters } from "../utils/statusList";

const IssueFilter = ({ handleFilter }) => {
    const [selected, setSelected] = useState("");

    const handleOnSelect = (option) => {
        handleFilter(option);
        setSelected(option);
    };

    return (
        <div>
            <Dropdown variant="secondary">
                <Dropdown.Toggle variant="secondary">
                    {selected ? selected : "Status"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {filters.map((option) => (
                        <Dropdown.Item
                            href=""
                            onClick={() => handleOnSelect(option)}
                            active={selected === option}
                        >
                            {option}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleOnSelect("")}>
                        Reset Filter
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default IssueFilter;
