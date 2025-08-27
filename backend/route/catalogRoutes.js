import express from 'express'
import multer from "multer"
import path from "path"
import * as controller from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//controller//catalogController.js'

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/PC/OneDrive/Desktop/inspireWeb/backend/server/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage:storage
});
router.get('/',controller.getAllCatalogs);
router.get('/:id',controller.getCatalogById);
router.put('/:id', upload.single('imageUrl') ,controller.editCatalog);
router.post('/',upload.single('imageUrl'),controller.createCatalog);
router.delete('/:id',controller.deleteCatalog);

export default router;