const authApiDocs = {
    "api/v1/auth/register":{
        post:{
            summary:"Register new user",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                name:{type:"string"},
                                email:{type:"string"},
                                password:{type:"sring"},
                                role:{type:"string"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Register Success"}
                                }
                            }
                        }
                    }
                },
                400:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", exmaple:"All fields are required"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Internal Server Error"}
                                }
                            }
                        }
                    }
                }

            }
        }
    },
    "api/v1/auth/login":{
        post:{
            summary:"Login a user",
            requestBody:{
                required:true,
                content:{
                    "applicatin/json":{
                        schema:{
                            type:"object",
                            properties:{
                                email:{type:"string"},
                                password:{type:"string"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "applicatin/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"login Sucess"}
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:'object',
                                properties:{
                                    message:{type:"string", example:"Inavalid Credential"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Internal Server Error"}
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
}
export default authApiDocs