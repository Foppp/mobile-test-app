const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const DB_URI = "mongodb+srv://admin_yura:admin_yura@cluster0.p0fmq.mongodb.net/Mobile_Task_Test?retryWrites=true&w=majority";
const app = express();

// app.use(express.urlencoded({ extended: true }));


app.use(express.json());

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Port running at ${port}`)
});