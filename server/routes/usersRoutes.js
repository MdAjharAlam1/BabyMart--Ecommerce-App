import express from "express";
import { admin, protect } from "../middleware/authMiddleware";
import { fetchAllUsers, createUser, fetchUserById, updateUserById, deleteUserById } from "../controller/usersController";

const router = express.router()

router.route('/').get(protect,admin, fetchAllUsers).post(protect, admin , createUser)

router.route('/:id')
    .get(protect, fetchUserById)
    .put(protect,updateUserById)
    .delete(protect,admin,deleteUserById)

export default router