import app from "./src/App";

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;