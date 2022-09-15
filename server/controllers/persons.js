const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`
    );
  });
});

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personsRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((phone) => {
      if (phone) response.json(phone);
      else {
        return response.status(404).json({
          error: `no data found corresponding to id ${id}`,
        });
      }
    })
    .catch((err) => next(err));
});

personsRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then(() => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const body = request.body;

  Person.find({ name: { $regex: new RegExp(`^${body.name}$`, "i") } })
    .then((result) => {
      if (result.length) {
        return response.status(400).json({
          error: "name must be unique",
        });
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        });

        person
          .save()
          .then((newPerson) => {
            return response.json(newPerson);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  Person.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPhone) => {
      response.json(updatedPhone);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
