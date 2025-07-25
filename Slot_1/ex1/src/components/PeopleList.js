function PeopleList() {
  const people = [
    { name: "Alice", age: 25, occupation: "Designer" },
    { name: "Bob", age: 30, occupation: "Developer" },
    { name: "Charlie", age: 28, occupation: "Teacher" },
  ];

  return (
    <div>
      <h2>People List</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            {person.name} - {person.age} years old - {person.occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleList;
