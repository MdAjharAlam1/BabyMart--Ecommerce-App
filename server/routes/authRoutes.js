import express from 'express'
import { createUser, fetchUserProfile, loginUser, logoutUser } from '../controller/authController.js'
import {protect,admin} from "../middleware/authMiddleware.js"

const router = express.Router()

// register user
router.post("/register", createUser)

// login user
router.post("/login", loginUser)

// profile
router.get("/profile", protect,fetchUserProfile)

// logout
router.post("/logout", protect, logoutUser)

export default router