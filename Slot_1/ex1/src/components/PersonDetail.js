function PersonDetail() {
    const person = {
        name: "David",
        age: 30,
        occupation: "Engineer",
    };

    return (
        <div>
            <h2>Person Details</h2>
            <p><strong>Name:</strong> {person.name}</p>
            <p><strong>Age:</strong> {person.age}</p>
            <p><strong>Occupation:</strong> {person.occupation}</p>
        </div>
    );
}

export default PersonDetail;
