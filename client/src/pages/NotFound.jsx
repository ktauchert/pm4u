import { Container, Typography, Link as MuiLink, Divider } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "20px",
            }}
        >
            <FaExclamationTriangle size={"5em"} color="red" />
            <Typography variant="h3">404</Typography>
            <Typography>Entschuldigung, diese Seite gibt es nicht.</Typography>
            <Divider />
            <MuiLink variant="body1" to="/" component={Link}>
                Go Back
            </MuiLink>
        </div>
    );
}
