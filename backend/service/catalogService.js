import * as repo from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//repo//catalogRepository.js'

export async function getCatalogs(){return repo.getCatalogs();}
export async function getCatalog(id){return repo.getCatalog(id);}
export async function createCatalog(name,category,description,imageUrl,user_id){return repo.createCatalog(name,category,description,imageUrl,user_id);}
export async function deleteCatalog(id){return repo.deleteCatalog(id);}
export async function editCatalog(id,name,category,description,imageUrl){return repo.editCatalog(id,name,category,description,imageUrl);}