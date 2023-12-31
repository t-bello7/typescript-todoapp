import express, {Express, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import sessions from "express-session";
import cors from "cors";
import { connectDB } from "./config/db.config";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import dbInit from "./models/init";
import User from './models/auth.model';
import sequelize from "./config/db.config";
import Task from './models/task.model';
import { verifyToken } from "./middleware/auth.middleware";

const app: Express = express();
connectDB();
sequelize.sync({ force: false, alter: true})

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, `${process.env.FRONTEND_PROD_URL}`);
    res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };
  
const whitelist = [`${process.env.FRONTEND_DEV_URL}`, `${process.env.FRONTEND_PROD_URL}`]
const corsOptions = {
	origin: whitelist
};

app.use(allowCrossDomain);
app.use(cors(corsOptions));

app.use(sessions({
    secret: process.env.TOKEN_KEY,
    saveUninitialized:true,
    cookie: { maxAge: 86400 },
    resave: false
}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to todo application."});
});

app.use('/api/auth',authRoutes);
app.use('/api/tasks', verifyToken , taskRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


