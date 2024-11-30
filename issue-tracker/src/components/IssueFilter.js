import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { options } from "../utils/statusOptions";

const IssueFilter = ({ handleFilter }) => {
    const [selected, setSelected] = useState("");

    // const options = ["New", "Pending", "Assigned", "Completed"];

    const handleOnSelect = (val) => {
        handleFilter(val);
        setSelected(val);
    };

    return (
        <div>
            <Dropdown variant="secondary">
                <Dropdown.Toggle variant="secondary">
                    {selected === "" ? "Status" : selected}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {options.map((option) => (
                        <Dropdown.Item
                            key={option}
                            href="#"
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
