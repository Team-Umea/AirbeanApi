import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/mainDocs.yaml"), "utf8")
);
const orderDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/orderDocs.yaml"), "utf8")
);

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...orderDoc.paths,
  },
  components: {
    schemas: {
      ...(orderDoc.components?.schemas || {}),
    },
  },
};
