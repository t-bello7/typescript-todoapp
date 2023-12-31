"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const db_config_1 = require("./config/db.config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const db_config_2 = __importDefault(require("./config/db.config"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
(0, db_config_1.connectDB)();
db_config_2.default.sync({ force: true });
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `${process.env.FRONTEND_PROD_URL}`);
    res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};
const whitelist = [`${process.env.FRONTEND_DEV_URL}`, `${process.env.FRONTEND_PROD_URL}`];
const corsOptions = {
    origin: whitelist
};
app.use(allowCrossDomain);
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_session_1.default)({
    secret: process.env.TOKEN_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 86400 },
    resave: false
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to todo application." });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tasks', auth_middleware_1.verifyToken, task_routes_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map