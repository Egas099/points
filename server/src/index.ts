import { createServer } from "http";
import io from "./socket";
import express from 'express';
// const express = require("express");

const PORT = process.env.PORT || 5000
const app = express();
const httpServer = createServer(app);
const socket = io(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready. Port: ${PORT}`)
});

