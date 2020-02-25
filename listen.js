const app = require("./server");
const { PORT = 9090 } = process.env;

app.listen(9090, () => console.log("listening on port 9090"));
