import { app } from "./init";
import { karyawanRouter } from "./router/karyawan";

app.use("/api/v1", karyawanRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on localhost:${process.env.PORT}`);
});
