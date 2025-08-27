import * as userService from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//service//userService.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req,res)=>{
    const users = await userService.getUsers();
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send(users);
};


export const isAuth = async (req, res, next) => {
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/frontend/loginPage.html');
    }
};

export const openForm = async (req,res)=>{
    res.sendFile('c://Users//PC//OneDrive//Desktop//inspireWeb//frontend//register.html');
};

export const getUserById = async (req,res)=>{
    const id = req.params.id;
    const user = await userService.getUser(id);
    if(user.length) res.send(user);
    else res.status(404).send("Id not found");
};

export const createUser = async (req,res)=>{
    try{//This salt is to make a specific hash for every user, so that if any malicious attack reached one user, it can't reach other due to different salt for each user.
        const p = await userService.getUserByName(req.body.name);
        if(p!==null) return res.redirect('/frontend/register.html');
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const {name} = req.body;
        const user = await userService.createUser(name,hashedPassword);
        res.redirect('/frontend/loginPage.html');
    }
    catch{
        res.status(500).send("Error creating a user.");
    }
};

export const deleteUser = async (req,res)=>{
    const id = req.params.id;
    const user = await userService.deleteUser(id);
    if(user.length) res.send(user);
    else res.status(404).send("Id not found");
};

export const loginUser = async (req,res)=>{
    try{
        const user = await userService.getUserDetails(req.body.name);
        //console.log(user[0].password);
        if(user===null){
            return res.redirect("/frontend/loginPage.html");
        }
        
        const x = await bcrypt.compare(req.body.password, user[0].password);
        if(x){
            req.session.user={
                id: user[0].id,
                name: user[0].username,
                isAdmin: user[0].is_admin
            };
            req.session.isAuth=true;
            res.redirect('/frontend/index.html');
        }
        else res.redirect("/frontend/loginPage.html");
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

export const index = async (req,res) => {
    res.render('/frontend/index.html');
};

export const logout = async (req,res) => {
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/frontend/loginPage.html');
    });
};

export const currentUser = async (req,res) => {
    if(req.session && req.session.user) res.json(req.session.user);
    else res.status(401).json("Not logged in.");
};


export function isAdmin(req,res,next){
    if(req.session.user && req.session.user.isAdmin){
        next();
    }
    else res.status(403).send("Acess denied. Admins only.")
}