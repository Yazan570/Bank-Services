import * as repo from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//repo//userRepository.js'

export async function getUsers(){return repo.getUsers();}
export async function getUser(id){return repo.getUser(id);}
export async function createUser(name,password){return repo.createUser(name,password);}
export async function deleteUser(id){return repo.deleteUser(id);}
export async function loginUser(name){return repo.loginUser(name);}
export async function getUserByName(name) {return repo.loginUser(name);}
export async function getUserDetails(name) {return repo.loginUserAll(name);}
