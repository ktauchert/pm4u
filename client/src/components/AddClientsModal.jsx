import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";

import { ADD_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
const LANG = "de";
const getTranslation = (key = "", language = LANG) => {
    if (language === "en") return key;
    return lang[key][language];
};

const lang = {
    "Add Client": {
        de: "Klient hinzufügen",
    },
    "Add a client to your list.": {
        de: "Fügen Sie einen Klienten hinzu.",
    },
    Name: {
        de: "Name",
    },
    Phone: {
        de: "Telefon",
    },
    Email: {
        de: "E-Mail",
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
    "The Client has been added. The Dialog closes in 3 seconds.": {
        de: "Der Klient wurde angelegt. Der Dialog schließt in 3 Sekuden.",
    },
};

export default function AddClientsModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        // refetchQueries: [{query: GET_CLIENTS}]
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.concat({ addClient }) },
            });
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const onClickCancel = () => {
        setOpen(false);
        setError(false);
        setName("");
        setPhone("");
        setEmail("");
    };
    const onClickSubmit = () => {
        console.log(name, phone, email);
        if (name === "" || phone === "" || email === "") {
            setError(true);
            return 1;
        }

        setError(false);
        addClient(name, email, phone);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false);
            setName("");
            setPhone("");
            setEmail("");
        }, 2500);
    };

    return (
        <>
            <Button onClick={handleClickOpen}>
                {getTranslation("Add Client")}
            </Button>
            <Dialog open={open} onClose={handleClickClose} maxWidth={"lg"}>
                <DialogTitle>{getTranslation("Add Client")}</DialogTitle>
                <DialogContent>
                    {error ? (
                        <Alert severity="error">
                            {getTranslation("Please fill out all fields.")}
                        </Alert>
                    ) : null}
                    {submitted ? (
                        <Alert severity="success">
                            {getTranslation(
                                "The Client has been added. The Dialog closes in 3 seconds."
                            )}
                        </Alert>
                    ) : null}
                    <DialogContentText>
                        {getTranslation("Add a client to your list.")}
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label={getTranslation("Name")}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="phone"
                        label={getTranslation("Phone")}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        label={getTranslation("Email")}
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
