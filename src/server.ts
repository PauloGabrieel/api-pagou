import app from "./app";
import loadEnvs from "./config/envs";

loadEnvs();

app.listen(4000, () => {
    console.log('Server running...');
});