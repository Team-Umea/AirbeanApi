import { authenticate } from "../authSlice";

const authenticateUser = (store) => (next) => (action) => {
  if (action.type === "AUTHENTICATE") {
    store.dispatch(authenticate());
  }

  return next(action);
};

export default authenticateUser;
