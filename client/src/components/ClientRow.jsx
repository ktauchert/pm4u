import { FaTrash } from "react-icons/fa";

export default function ClientRow({ client }) {
    return (
        <tr>
            <td scope="row">{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm">
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
