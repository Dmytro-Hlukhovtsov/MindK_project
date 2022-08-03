import { createContext } from "react";

const authContext = createContext({
  context: {},
  setContext: () => {},
});

export default authContext;
