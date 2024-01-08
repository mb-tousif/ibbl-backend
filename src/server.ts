/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import config from "./config";
import app from "./app";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function ConnectServer() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🔌 Database is connected successfully`);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port 5000`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});

ConnectServer();