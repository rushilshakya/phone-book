import { useState, useEffect } from "react";

import AddNewPerson from "./AddNewPerson";
import SearchFilter from "./SearchFilter";
import ShowPersons from "./ShowPersons";
import personService from "./services/persons";
import Message from "./Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("NORMAL");

  useEffect(() => {
    personService.getAll().then((people) => {
      setPersons(people);
    });
  }, []);

  const createMessage = (curMessage, type = "NORMAL", time = 2000) => {
    setMessage(curMessage);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, time);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={messageType} />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <AddNewPerson
        persons={persons}
        setPersons={setPersons}
        createMessage={createMessage}
      />
      <ShowPersons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        createMessage={createMessage}
      />
    </div>
  );
};

export default App;
