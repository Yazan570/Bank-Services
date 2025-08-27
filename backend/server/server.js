import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import mysql from 'mysql2'
import cors from 'cors'
import path from 'path'
import MySQLStoreFactory from 'express-mysql-session'
import catalogRoutes from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//route//catalogRoutes.js'
import userRoutes from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//route//userRoutes.js'
const app=express();
dotenv.config({path: 'c://Users//PC//OneDrive//Desktop//inspireWeb//.env'});
const mySQLStore = MySQLStoreFactory(session);
const options = {
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
};
const sessionStore = new mySQLStore(options);
app.use(express.static('C:/Users/PC/OneDrive/Desktop/inspireWeb'));
app.use(express.json());
app.use(session({
    secret: 'ley that will sign the cookie',
    resave: false, //do you want to create a new session for every request to the browser?
    saveUninitialized: false, //Do you want to save even if you didn't modify or change anything?
    store:sessionStore //To store the session in our created mysql database.
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());//security issues.
app.use("/images", express.static(path.resolve("images")));
app.use('/services',catalogRoutes);
app.use('/users',userRoutes);
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(8080, ()=>{
    console.log('Server is running on port 8080');
})