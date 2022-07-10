export default function MessageBox({ type = "danger", message = [] }) {
    let alertType = `alert alert-${type}`;

    return (
        <div className={alertType}>
            <h4>Fehler</h4>
            <ul>
                {message.map((value) => (
                    <li>{value}</li>
                ))}
            </ul>
        </div>
    );
}
