import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

export default function ClientInfo({ client, type }) {
    return (
        <Box maxWidth={"50%"} sx={{ marginTop: "50px" }}>
            {type === "project" ? (
                <Divider variant="middle" sx={{ marginBottom: "10px" }} />
            ) : null}
            <Typography variant="h5">Client-Info</Typography>
            <Typography variant="subtitle1">
                {" "}
                <FaUser /> {client.name}{" "}
            </Typography>
            <Typography variant="subtitle1">
                {" "}
                <FaPhone /> {client.phone}{" "}
            </Typography>
            <Typography variant="subtitle1">
                {" "}
                <FaEnvelope />
                {client.email}{" "}
            </Typography>
        </Box>
    );
}
