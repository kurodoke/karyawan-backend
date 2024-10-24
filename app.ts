import { app } from "./init";
import { karyawanRouter } from "./router/karyawan";
import { loginRouter } from "./router/login";

app.use("/api/v1/karyawan", karyawanRouter);
app.use("/api/v1/auth", loginRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on localhost:${process.env.PORT}`);
});
