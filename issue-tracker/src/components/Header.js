import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    const headerLinks = [
        {
            link: "/",
            text: "Home",
        },
        {
            link: "/issuelist",
            text: "Issue List",
        },
        {
            link: "/issuelist/add",
            text: "Add New Issue",
        },
    ];

    return (
        <header className="bg-dark p-3">
            <Container>
                <ul className="mb-0 p-0 list-style-none d-flex gap-4">
                    {headerLinks.map((headerLink) => (
                        <li key={headerLink.text}>
                            <Button variant="light">
                                <Link
                                    to={headerLink.link}
                                    className="text-decoration-none text-dark"
                                >
                                    {headerLink.text}
                                </Link>
                            </Button>
                        </li>
                    ))}
                    {/* <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/issuelist">Issue List</Link>
                </li>
                <li>
                    <Link to="/issuelist/add">Add New Issue</Link>
                </li> */}
                </ul>
            </Container>
        </header>
    );
};

export default Header;
