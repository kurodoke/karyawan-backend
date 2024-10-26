import { app } from "./init";
import { karyawanRouter } from "./router/karyawan";
import { loginRouter } from "./router/login";
import cors from "cors";

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

app.use(cors());
app.use("/api/v1/karyawan", karyawanRouter);
app.use("/api/v1/auth", loginRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on localhost:${process.env.PORT}`);
});
