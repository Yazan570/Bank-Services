import pool from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//pool//pool.js'

export async function getCatalogs(){
    const [rows] = await pool.query("select * from catalog");
    return rows;
}

export async function getCatalog(id){
    const [rows] = await pool.query(`select * from catalog where id=?`,[id]);
    return rows;
}

export async function createCatalog(name, category, description,imageUrl,user_id){
    const [result] = await pool.query(`insert into catalog (name, category, description, imageUrl, user_id) values (?,?,?,?,?)`,[name,category,description,imageUrl,user_id]);
    const id = result.insertId;
    return getCatalog(id);
}

export async function deleteCatalog(id) {
    const del=await getCatalog(id);
    const [result] = await pool.query(`delete from catalog where id=?`,[id]);
    return del;
}

export async function editCatalog(id,name,category,description,imageUrl){
    const [result] = await pool.query(`update catalog set name=?,category=?,description=?,imageUrl=? where id=?`,[name,category,description,imageUrl,id]);
    return getCatalog(id);
}