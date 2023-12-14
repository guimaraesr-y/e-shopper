import express from "express";
import cookieParser from "cookie-parser";

import UserFactory from "./user/factory";
import ErrorHandler from "./middlewares/errorHandler.";
import RoleFactory from "./role/factory";
import AddressFactory from "./address/factoty";

const app = express();

// express configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// app modules routes
app.use('/user', UserFactory.userRouter);
app.use('/role', RoleFactory.roleRouter);
app.use('/address', AddressFactory.addressRouter);

// express error handler
app.use(ErrorHandler.error);

export default app;