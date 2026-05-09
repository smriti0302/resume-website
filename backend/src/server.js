import express from "express";
import cors from "cors";
import { profileData } from "./profileData.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/profile", (_req, res) => {
  res.json(profileData);
});

app.get("/api/projects", (_req, res) => {
  res.json(profileData.projects);
});

app.get("/api/blogs", (_req, res) => {
  res.json(profileData.blogs);
  ī;
});

app.listen(port, () => {
  console.log(`Resume API running on http://localhost:${port}`);
});
