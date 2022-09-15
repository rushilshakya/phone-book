import Person from "./Person";
import personService from "./services/persons";

const ShowPersons = ({ persons, setPersons, filter, createMessage }) => {
  const personsToShow = filter.trim().length
    ? persons.filter((person) =>
        person.name.trim().toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const deletePerson = (person) => {
    if (confirm(`deleting ${person.name}`)) {
      personService
        .remove(person.id)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          setPersons(persons.filter((curPerson) => curPerson.id !== person.id));
          createMessage(
            `Information of ${person.name} has been removed from server`
          );
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 404) {
            createMessage(
              `Information of ${person.name} has already been removed from server`,
              "ERROR"
            );
          }
        });
    }
  };

  return (
    <>
      <h3>Numbers</h3>
      {personsToShow.map((person) => (
        <Person person={person} deletePerson={deletePerson} key={person.name} />
      ))}
    </>
  );
};

export default ShowPersons;
