import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import IssueList from "./components/IssueList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Homepage from "./components/Homepage";
import IssueDetails from "./components/IssueDetails";
import IssueAdd from "./components/IssueAdd";
import IssueUpdate from "./components/IssueUpdate";
import "bootstrap/dist/css/bootstrap.min.css";
// import "react-multi-carousel/lib/styles.css";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                issues: {
                    merge: (existing, incoming) => incoming,
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache,
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/issuelist",
                element: <IssueList />,
            },
            {
                path: "/issuelist/:issueid",
                element: <IssueDetails />,
            },
            {
                path: "/issuelist/issueadd",
                element: <IssueAdd />,
            },
            {
                path: "/issuelist/update/:issueid",
                element: <IssueUpdate />,
            },
        ],
    },
]);

function App() {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}

export default App;
