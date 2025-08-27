import pool from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//pool//pool.js'

export async function getUsers(){
    const [rows] = await pool.query("select * from user");
    return rows;
}
export async function getUser(id){
    const [rows] = await pool.query(`select * from user where id=?`,[id]);
    return rows;
}
export async function createUser(name,password){
    const [result] = await pool.query(`insert into user (username,password) values (?,?)`,[name,password]);
    const id = result.insertId;
    return getUser(id);
}
export async function deleteUser(id) {
    const del = await getUser(id);
    const [result] = await pool.query(`delete from user where id=?`,[id]);
    return del;
}
export async function loginUser(name){
    const [rows] = await pool.query(`select password from user where username=?`,[name]);
    return rows.length>0?rows[0].password : null;
}
export async function loginUserAll(name){
    const [rows] = await pool.query(`select * from user where username=?`,[name]);
    return rows.length>0?rows : null;
}