const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const DB_URI = "mongodb+srv://admin_yura:admin_yura@cluster0.p0fmq.mongodb.net/Mobile_Task_Test?retryWrites=true&w=majority";
const app = express();

// app.use(express.urlencoded({ extended: true }));


app.use(express.json());

// app.use((_, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });



const connectToDatabase = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(DB_URI, connectionParams);
    console.log('Successfuly connected to database');
  } catch (error) {
    console.log('Connection Failed', error);
  }
};

app.use(router);

connectToDatabase();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Port running at ${port}`)
});