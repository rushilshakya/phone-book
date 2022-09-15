const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        const nums = v.split("-");

        if (nums[1]) {
          return (
            nums.length === 2 &&
            nums[1].length >= 8 &&
            [2, 3].includes(nums[0].length)
          );
        } else {
          return nums[0].length >= 8;
        }
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Phonebook", phoneSchema);
