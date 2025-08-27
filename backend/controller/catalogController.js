import * as catalogService from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//service//catalogService.js'


export const getAllCatalogs = async (req,res)=>{
    const catalogs = await catalogService.getCatalogs();
    res.send(catalogs);
};
export const getCatalogById = async (req,res)=>{
    const id=req.params.id;
    const catalog=await catalogService.getCatalog(id);
    if(catalog.length)
        res.send(catalog);
    else res.status(404).send("Id not found");
};
export const createCatalog = async (req,res)=>{
    const file = req.file;
    const {name,category,description,user_id}=req.body;
    const imageUrl = file ? `/backend/server/images/${file.filename}` : null;
    const catalog = await catalogService.createCatalog(name,category,description,imageUrl,user_id);
    res.status(201).send(catalog);
};
export const deleteCatalog = async (req,res)=>{
    const id=req.params.id;
    const catalog = await catalogService.deleteCatalog(id);
    if(catalog.length)
        res.send(catalog);
    else res.status(404).send("Id not found");
};
export const editCatalog = async (req,res)=>{
    const file = req.file;
    const id = req.params.id;
    const {name,category,description}=req.body;
    const imageUrl = file ? `/backend/server/images/${file.filename}` : null;
    const catalog = await catalogService.editCatalog(id,name,category,description,imageUrl);
    if(catalog.length)
        res.send(catalog);
    else res.status(404).send("Id not found");
};