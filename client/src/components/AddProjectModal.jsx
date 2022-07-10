import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const LANG = "de";
const getTranslation = (key = "", language = LANG) => {
    if (language === "en") return key;
    if (!lang[key]) return key;

    return lang[key][language];
};

const lang = {
    "Add Project": {
        de: "Projekt hinzufügen",
    },
    "Add a project to your list.": {
        de: "Fügen Sie ein Projekt hinzu.",
    },
    Name: {
        de: "Name",
    },
    Description: {
        de: "Beschreibung",
    },
    Status: {
        de: "Status",
    },
    Cancel: {
        de: "Abbrechen",
    },
    Submit: {
        de: "Übertragen",
    },
    "Please fill out all fields.": {
        de: "Bitte füllen Sie alle Felder aus.",
    },
    "The Project has been added. The Dialog closes in 3 seconds.": {
        de: "Das Projekt wurde angelegt. Der Dialog schließt in 3 Sekuden.",
    },
};

export default function AddProjectModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");
    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        // refetchQueries: [{query: GET_CLIENTS}]
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({
                query: GET_PROJECTS,
            });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.concat({ addProject }) },
            });
        },
    });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const onClickCancel = () => {
        setOpen(false);
        setInputError(false);
        setName("");
        setDescription("");
        setStatus("new");
    };
    const onClickSubmit = () => {
        console.log(name, description, status, clientId);
        if (name === "" || description === "" || clientId === "") {
            setInputError(true);
            return 1;
        }

        setInputError(false);
        addProject(name, description, status, clientId);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false);
            setName("");
            setClientId("");
            setDescription("");
            setStatus("new");
        }, 2500);
    };

    return (
        <>
            <Button onClick={handleClickOpen}>
                {getTranslation("Add Project")}
            </Button>
            <Dialog open={open} onClose={handleClickClose} maxWidth={"lg"}>
                <DialogTitle>{getTranslation("Add Project")}</DialogTitle>
                <DialogContent>
                    {inputError ? (
                        <Alert severity="error">
                            {getTranslation("Please fill out all fields.")}
                        </Alert>
                    ) : null}
                    {submitted ? (
                        <Alert severity="success">
                            {getTranslation(
                                "The Project has been added. The Dialog closes in 3 seconds."
                            )}
                        </Alert>
                    ) : null}
                    <DialogContentText>
                        {getTranslation("Add a project to your list.")}
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label={getTranslation("Name")}
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        multiline={true}
                        rows={3}
                        maxRows={7}
                        required
                        margin="dense"
                        id="description"
                        label={getTranslation("Description")}
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl sx={{ marginTop: 2 }} fullWidth>
                        <InputLabel>{getTranslation("Status")}</InputLabel>
                        <Select
                            fullWidth={true}
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="new">
                                {getTranslation("Not Started")}
                            </MenuItem>
                            <MenuItem value="progress">
                                {getTranslation("In Progress")}
                            </MenuItem>
                            <MenuItem value="completed">
                                {getTranslation("Completed")}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    ´
                    <>
                        {!loading && !error && data ? (
                            <FormControl sx={{ marginTop: 2 }} fullWidth>
                                <InputLabel>
                                    {getTranslation("Clients")}
                                </InputLabel>
                                <Select
                                    fullWidth={true}
                                    label="Clients"
                                    value={clientId}
                                    onChange={(e) =>
                                        setClientId(e.target.value)
                                    }
                                >
                                    <MenuItem value="">
                                        {getTranslation("Select Client...")}
                                    </MenuItem>
                                    {data.clients.map((client) => (
                                        <MenuItem
                                            key={client.id}
                                            value={client.id}
                                        >
                                            {client.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <Typography>
                                {getTranslation("No Clients created yet.")}
                            </Typography>
                        )}
                    </>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onClickCancel}
                    >
                        {getTranslation("Cancel")}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onClickSubmit}
                    >
                        {getTranslation("Submit")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
