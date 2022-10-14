const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://instagram.famd4-1.fna.fbcdn.net/v/t51.2885-15/301413433_183685360739511_5675401646893319187_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.famd4-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=DnpiTOZ98-EAX86hiBf&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxMjc1NTUyOTkxMzEzMTUwNw%3D%3D.2-ccb7-5&oh=00_AT_3rcdkL96WFy0qq5Ea1PVu8qKusEHU0jjwGHUrUoWo0w&oe=63508D08&_nc_sid=30a2ef",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
