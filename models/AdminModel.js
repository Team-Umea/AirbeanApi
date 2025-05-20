import { ResourceNotFoundError } from "../errors/resourceErrors.js";
import { UnauthorizedError } from "../errors/roleErrors.js";
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
};

export default Admin;
