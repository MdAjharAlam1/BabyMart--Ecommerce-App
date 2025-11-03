import express from 'express'
import { registerUser,loginUser, getProfileUser, logoutUser } from '../controller/authController.js'
import {protect,admin} from "../middleware/authMiddleware.js"

const router = express.Router()

// register user
router.post("/register", registerUser)

// login user
router.post("/login", loginUser)

// profile
router.get("/profile", protect,getProfileUser)

// logout
router.post("/logout", protect, logoutUser)

export default router