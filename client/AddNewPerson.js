import { useState } from "react";
import personService from "./services/persons";

const AddNewPerson = ({ persons, setPersons, createMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    if (newNumber.trim() === "" || newName.trim() === "") {
      createMessage("name and / or number is empty", "WARNING");
      return;
    }
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === response.id ? response : person
              )
            );
            createMessage(`Updated ${response.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            createMessage(error.response.data.message, "ERROR", 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          createMessage(`Added ${response.name}`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) =>
          createMessage(error.response.data.message, "ERROR", 5000)
        );
    }
  };

  return (
    <form onSubmit={addPerson}>
      <h3>Add a new entry</h3>
      <div>
        name:{" "}
        <input
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          value={newName}
        />
      </div>
      <div>
        number:{" "}
        <input
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddNewPerson;
