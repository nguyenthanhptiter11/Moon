//src/server.ts

import app from "./app";
import { PORT } from "./constants/docktypeApi.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));