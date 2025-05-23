import { ResourceNotFoundError } from "../errors/resourceErrors.js";
import { UnauthorizedError } from "../errors/authErrors.js";
import { executeQuery } from "../services/dbService.js";

const Admin = {
  getById: async function (profileId) {
    const findProfileResult = await executeQuery(
      `
        SELECT FROM profile
        WHERE id = $1;   
    `,
      [profileId]
    );

    if (findProfileResult.length === 0) {
      throw new ResourceNotFoundError(`Profile with ID '${profileId}' not found`);
    }

    const findAdminResult = await executeQuery(
      `
        SELECT FROM admin
        WHERE profile_id = $1;     
    `,
      [profileId]
    );

    if (findAdminResult.length === 0) {
      throw new UnauthorizedError(`Profile with ID '${profileId}' lacks admin permissions`);
    }
  },
  getByProfileId: async function (profileId) {
    const result = await executeQuery(
      `
      SELECT id FROM admin
      WHERE profile_id = $1
    `,
      [profileId]
    );
    return result[0];
  },
};

export default Admin;
