import { executeQuery } from "../services/dbService.js";

const Profile = {
  getAll: async function () {
    return await executeQuery("SELECT * FROM profile");
  },
  getByUsername: async function (username = "") {
    const result = await executeQuery(
      `
        SELECT *
        FROM profile
        WHERE username = $1
    `,
      [username.trim()]
    );

    return result[0];
  },
  create: async function (username, email, password_hash) {
    const result = await executeQuery(
      `
        INSERT INTO profile (username, email, password_hash) VALUES($1, $2, $3)
        RETURNING *;
    `,
      [username, email, password_hash]
    );

    return result[0];
  },
};

export default Profile;
