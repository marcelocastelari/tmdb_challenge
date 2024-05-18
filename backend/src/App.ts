import express from 'express';

const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});