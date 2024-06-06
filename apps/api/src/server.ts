import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import packageJson from "../package.json";
import { eventsRoutes } from "./infra/http/controllers/events/routes";

const app = new OpenAPIHono();

app.use(cors());

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Aqua",
    version: packageJson.version,
    contact: {
      name: packageJson.author.name,
      email: packageJson.author.email,
      url: packageJson.author.url,
    },
  },
});

app.get(
  "/docs",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
  }),
);

const routes = app.route("/events", eventsRoutes);
export type AppType = typeof routes;

export default app;
