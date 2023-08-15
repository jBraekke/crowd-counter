import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { join } from "path";

import connectToDb from "./server/controller/init/connect-db";
import bootstrapDb from "./server/controller/init/bootstrap-db";
import { setCool, setEger, validateCar } from "./server/controller/car-validation/post-car-validation";
import { getParkingZones, getUsers } from "./server/controller/parking-zones/parking-zones";
import { initiateAccredidationSession } from "./server/controller/accreditation-session/post-accreditation-session";
import { initiateSocket } from "./server/webSocket/ws";

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, "../client/build")));

const httpServer = createServer(app);

const socket = initiateSocket(httpServer);

connectToDb();
bootstrapDb();

app.get("/api/parking-zones", (req: Request, res: Response) => {
  getParkingZones(res);
});

app.get("/api/users", (req: Request, res: Response) => {
  getUsers(res);
});

app.get("/api/enable-awesomeness", (req: Request, res: Response) => {
  socket.emit("enable-awesomeness");
  res.send(200);
});

app.post("/api/car-validation", async (req: Request, res: Response) => {
  await validateCar(req, res);
  socket.emit("validated-car");

});

app.post("/api/set-eger", async (req: Request, res: Response) => {
  await setEger(req, res);
  socket.emit("validated-car");
});

app.post("/api/set-cool", async (req: Request, res: Response) => {
  await setCool(req, res);
  socket.emit("validated-car");
});

app.post("/api/accreditation-session", (req: Request, res: Response) => {
  initiateAccredidationSession(req, res);
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port ${port}`);
});
