import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
    createCategoryController,
    deleteCategoryController,
    getSinglecategoryController,
    getcategoryController,
    updateCategoryController
} from '../controllers/categoryController.js'

const router = express.Router()

//routes // create category
router.post('/create-category', authMiddleware.requireSignin, authMiddleware.isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', authMiddleware.requireSignin, authMiddleware.isAdmin, updateCategoryController)

//getALL category
router.get('/get-category', getcategoryController)

//single category
router.get('/single-category/:slug', getSinglecategoryController)

//delete category
router.delete('/delete-category/:id', authMiddleware.requireSignin, authMiddleware.isAdmin, deleteCategoryController)

export default router