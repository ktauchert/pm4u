import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardHeader
                    title={project.name}
                    subheader={project.status}
                    action={
                        <MuiLink to={`project/${project.id}`} component={Link}>
                            <IconButton>
                                <FaPlusCircle />{" "}
                            </IconButton>
                        </MuiLink>
                    }
                />
            </Card>
        </Grid>
    );
}
