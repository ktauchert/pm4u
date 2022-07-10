import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@mui/material";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        return <Typography>Es werden nach Projekten gesucht.</Typography>;
    }
    if (error) {
        return (
            <Typography>
                Es gibt einen Fehler, laden Sie die Seite neu.
            </Typography>
        );
    }

    return (
        <Grid container spacing={2}>
            {data.length < 1 ? (
                <Typography>
                    Es gibt noch keine Projekte, legen Sie eins an.
                </Typography>
            ) : null}
            {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </Grid>
    );
}
