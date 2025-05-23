import ProfileService from "./profileService.js";
import AdminModel from "../models/AdminModel.js";

const Admin = {
  login: async function (username, password) {
    const user = await ProfileService.login(username, password);

    if (!user) {
      return { error: 400 };
    }

    const { id: profileId } = user;

    const admin = await AdminModel.getByProfileId(profileId);

    if (!admin) {
      return { error: 401 };
    }

    return user;
  },
};

export default Admin;
