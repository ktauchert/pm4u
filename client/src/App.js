import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientsModal from "./components/AddClientsModal";
import "./App.css";
import Projects from "./components/Projects";
import { Box, Container } from "@mui/material";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/project/:id" element={<Project />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </Router>
            </ApolloProvider>
        </>
    );
}

export default App;
