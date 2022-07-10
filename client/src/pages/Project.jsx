import { useQuery } from "@apollo/client";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Link as MuiLink,
    IconButton,
    Divider,
    List,
    ListItem,
    CardActions,
} from "@mui/material";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import { GET_PROJECT } from "../queries/projectQueries";

const statusColor = {
    "Not Started": "red",
    "In Progress": "orange",
    Completed: "green",
};

export default function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });
    console.log(id);

    if (loading) return <Typography>Lade Daten</Typography>;
    if (error) return <Typography>Fehler beim Holen</Typography>;

    return (
        <>
            <Box sx={{ marginTop: "50px" }}>
                {!loading && !error && (
                    <Card variant="elevation">
                        <CardHeader
                            sx={{ bgcolor: "primary.main" }}
                            title={data.project.name}
                            titleTypographyProps={{ color: "white" }}
                            action={
                                <>
                                    <MuiLink to={`/`} component={Link}>
                                        <IconButton >
                                            <FaArrowCircleLeft color="white" />
                                        </IconButton>
                                    </MuiLink>
                                    <DeleteProjectButton
                                        projectId={data.project.id}
                                    />
                                </>
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Typography
                                variant="subtitle2"
                                color={statusColor[data.project.status]}
                            >
                                {data.project.status}
                            </Typography>
                            <Typography variant="h5">Beschreibung:</Typography>
                            <Typography>{data.project.description}</Typography>

                            {data.project.client && (
                                <ClientInfo
                                    type={"project"}
                                    client={data.project.client}
                                />
                            )}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </>
    );
}
