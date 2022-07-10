import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
const lang = {
    Name: {
        de: "Name",
    },
    Phone: {
        de: "Telefon",
    },
    Email: {
        de: "E-Mail",
    },
    Action: {
        de: "Aktion",
    },
};
const LANG = "de";
const getTranslation = (key = "", language = LANG) => {
    if (language === "en") return key;
    return lang[key][language];
};

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>Irgendwas ist falsch...</p>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="client table">
                <TableHead>
                    <TableRow>
                        <TableCell>{getTranslation("Phone", LANG)}</TableCell>
                        <TableCell>{getTranslation("Phone", LANG)}</TableCell>
                        <TableCell>{getTranslation("Email", LANG)}</TableCell>
                        <TableCell>{getTranslation("Action", LANG)}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.clients.map((client) => (
                        <ClientRow key={client.id} client={client} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
