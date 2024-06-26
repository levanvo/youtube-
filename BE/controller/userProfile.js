import Model_User from "../model/login.js";
import jwt from 'jsonwebtoken';

export const allUser = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).json({
                message: "Missing authorization token"
            });
        }

        jwt.verify(token, 'levanvo2k', async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid or expired token."
                });
            } else {
                const verifiy = await Model_User.findById(decoded._id);
                const { scopes } = verifiy;
                
                if (scopes.includes("admin")) {
                    const dataUser = await Model_User.find();
                    return res.status(200).json({
                        message: "All Users",
                        dataUser
                    });
                }else{
                    return res.status(500).json({
                        message: "You do not have permissions !!"
                    });
                };
            };
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const oneUser = async (req, res) => {
    try {
        // const token = req.headers.authorization;

        // if (!token) {
        //     return res.status(403).json({
        //         message: "Missing authorization token"
        //     });
        // }
        // jwt.verify(token, 'levanvo2k', async (err, decoded) => {
        // if (err) {
        //     return res.status(403).json({
        //         message: "Invalid or expired token"
        //     });
        // } else {
        const _idUser = req.params.id;
        const dataUser = await Model_User.findById(_idUser);
        return res.status(200).json({
            message: "getOne User.",
            dataUser
        });
        //     }
        // })
    } catch {
        return res.status(403).json({
            message: "you not authorization !"
        })
    }
};

export const updateUser = async (req, res) => {
    try {
        // const token = req.headers.authorization;

        // if (!token) {
        //     return res.status(403).json({
        //         message: "Missing authorization token"
        //     });
        // }
        const authorization = red.body;
        const _idUser = req.params.id;
        const dataBodyUser = req.body;

        const dataUser = await Model_User.findByIdAndUpdate(_idUser, dataBodyUser, { new: true });

        return Promise.resolve({
            message: "getOne User.",
            dataUser
        });
    } catch {
        return res.status(403).json({
            message: "you not authorization !"
        })
    }
};

export const removeUser = async (req, res) => {
    try {
        // const token = req.headers.authorization;

        // if (!token) {
        //     return res.status(403).json({
        //         message: "Missing authorization token"
        //     });
        // }
        const _idUser = req.params.id;

        const dataUser = await Model_User.findByIdAndDelete(_idUser);

        return Promise.resolve({
            message: "deleted User.",
            dataUser
        });
    } catch {
        return res.status(403).json({
            message: "you not authorization !"
        })
    }
};
