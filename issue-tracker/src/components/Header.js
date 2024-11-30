import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Container>
                <ul className="d-flex gap-3 py-3 px-0 mb-0">
                    <li>
                        <Button variant="light">
                            <Link className="text-dark" to="/">
                                Home
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="light">
                            <Link className="text-dark" to="/issuelist">
                                Issue List
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="light">
                            <Link
                                className="text-dark"
                                to="/issuelist/issueadd"
                            >
                                Add New Issue
                            </Link>
                        </Button>
                    </li>
                </ul>
            </Container>
        </header>
    );
};

export default Header;
