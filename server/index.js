const express = require('express');
const app = express();

const cors = require('cors');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware')
const dotenv = require('dotenv');

const userRoute = require('./routes/userRoutes')
const urlRoute = require('./routes/urlRoutes')
const redirectRoute = require('./routes/redirectRoutes')

dotenv.config();

// cookieParser INIT
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(express.json())
app.use('/api', userRoute)
app.use('/api', urlRoute)
app.use('/t', redirectRoute)

app.use(errorMiddleware);

const start = async() => {
    const PORT = process.env.PORT || 5000;
    try {
        app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

        await mongoose.connect(process.env.MONGO_URL)
                    .then(() => console.log('MongoDB connected'))
                    .catch((err) => {console.log(`MongoDB error: ${err}`)})
    } catch (err) {
        console.log(`Problem in index.js, func start(), problem: ${err}`);
        process.exit(1);
    }
}

start()