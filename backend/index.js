import app from './app.js';

const PORT = process.env.PORT || 8010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
