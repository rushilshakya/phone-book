const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://dbuser:${password}@cluster0.zjjc4.mongodb.net/phoneApp?retryWrites=true&w=majority`;

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Phone = mongoose.model("Phonebook", phoneSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    if (name) {
      const phone = new Phone({
        name,
        number,
      });

      return phone.save();
    } else {
      return Phone.find({});
    }
  })
  .then((result) => {
    if (name) {
      console.log("Phone saved!");
    } else {
      console.log("phonebook:");
      result.forEach((phone) => {
        console.log(`${phone.name} ${phone.number}`);
      });
    }
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
