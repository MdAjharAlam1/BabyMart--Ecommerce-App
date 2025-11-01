import authApiDocs from "../swagger/auth.swagger.js"
import dotenv from "dotenv"
dotenv.config()

const swaggerConfig = {
  openapi: '3.0.0',
  info:{
    title:"BabyMarts Api Documentation",
    description:"All the private and public api listed here",
    version:"1.0.0",
    contact:{
      name:"Md Ajhar Alam",
      email:"mdajharalam68@gmail.com"
    }
  },
  servers:[
    {url: process.env.DEVELOPMENT_SERVER_URL}
  ],
  paths:{
    ...authApiDocs
  }
}

export default swaggerConfig