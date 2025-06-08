module.exports.registerPost= (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 401,
            message: "Vui lòng nhập Email!"
        });
        return;
    }
    if(!req.body.password){
        res.json({
            code: 401,
            message: "Vui lòng nhập Mật khẩu!"
        });
        return;
    }
    if(!req.body.password){
        res.json({
            code: 401,
            message: "Vui lòng nhập Họ tên!"
        });
        return;
    }
    
    next();
}

// module.exports.RegisterPatch = (req, res, next) => {
//     if(!req.body.userName){
//         res.json({
//             code: 401,
//             message: "Vui lòng nhập Email!"
//         });
//         return;
//     }
//     if(!req.body.email){
//         req.flash("error", "Vui lòng nhập Email!");
//         res.redirect("back");
//         return;
//     }
    
//     next();
// };

module.exports.loginPost= (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 401,
            message: "Vui lòng nhập Email!"
        });
        return;
    }
    if(!req.body.password){
        res.json({
            code: 401,
            message: "Vui lòng nhập Mật khẩu!"
        });
        return;
    }
    
    next();
};

module.exports.forgotPasswordPost= (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 401,
            message: "Vui lòng nhập Email!"
        });
        return;
    }
    
    next();
};

module.exports.resetPasswordPost= (req, res, next) => {
    if(!req.body.password){
        res.json({
            code: 401,
            message: "Vui lòng nhập Mật khẩu!"
        });
        return;
    }
    if(!req.body.confirmPassword){
        res.json({
            code: 401,
            message: "Vui lòng xác nhận Mật khẩu!"
        });
        return;
    }
    if(req.body.password != req.body.confirmPassword){
        res.json({
            code: 400,
            message: "Mật khẩu không trùng khớp!"
        });
        return;
    }
    
    next();
};

module.exports.editPasswordPost= async (req, res, next) => {
    if(!req.body.password){
        if(!req.body.password){
            res.json({
                code: 401,
                message: "Vui lòng nhập Mật khẩu cũ!"
            });
            return;
        }
        return;
    }
    if(!req.body.newPassword){
        if(!req.body.password){
            res.json({
                code: 401,
                message: "Vui lòng nhập Mật khẩu mới!"
            });
            return;
        }
        return;
    }
    if(!req.body.confirmPassword){
        if(!req.body.password){
            res.json({
                code: 401,
                message: "Vui lòng xác nhận Mật khẩu!"
            });
            return;
        }
        return;
    }
    if(req.body.newPassword != req.body.confirmPassword){
        if(!req.body.password){
            res.json({
                code: 400,
                message: "Mật khẩu không trùng khớp!"
            });
            return;
        }
        return;
    }
    
    next();
};