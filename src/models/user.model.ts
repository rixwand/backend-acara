import { model, Schema } from "mongoose";
import User from "../interface/User";
import { encrypt } from "../utils/encryption";
import { renderMailHtml, sendMail } from "../utils/mail/mail";
import { CLIENT_URL } from "../utils/env";

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);
  next();
});

UserSchema.post("save", async (doc, next) => {
  const user = doc;
  console.log("Send email to: ", user.email);

  try {
    const contentMail = await renderMailHtml("registration-success.ejs", {
      username: user.username,
      activationLink: `${CLIENT_URL}/auth/activation?code=${user.activationCode}`,
    });

    await sendMail({
      from: "acara-test@zohomail.com",
      to: user.email,
      subject: "ACARA User Activation",
      html: contentMail,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  } finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const userModel = model("user", UserSchema);

export default userModel;
