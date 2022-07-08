import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Irgendwas ist falsch...</p>;

    return (
        <>
            {!loading && !error && (
                <table class="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            // Client Row comes here
                            <ClientRow client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
