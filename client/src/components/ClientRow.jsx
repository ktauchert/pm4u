import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Button, TableCell, TableRow } from "@mui/material";

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries: [{query: GET_CLIENTS}]
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(
                        (client) => client.id !== deleteClient.id
                    ),
                },
            });
        },
    });

    return (
        <TableRow>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>
                <Button onClick={deleteClient}>
                    <FaTrash />
                </Button>
            </TableCell>
        </TableRow>
    );
}
