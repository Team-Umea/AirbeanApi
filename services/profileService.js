import ProfileModel from "../models/ProfileModel.js";
import bcrypt from "bcrypt";

const Profile = {
  ensureUnique: async function (username, email) {
    const profiles = await ProfileModel.getAll();

    return !profiles.some(
      (pro) =>
        pro.username.trim().toLowerCase() === username.trim().toLowerCase() ||
        pro.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
  },
  login: async function (username, password) {
    const profile = await ProfileModel.getByUsername(username);

    if (!profile) {
      return null;
    }

    const isCorrectPassword = await bcrypt.compare(password, profile.password_hash);

    if (isCorrectPassword) {
      return profile;
    }

    return null;
  },
};

export default Profile;
