'use strict';


module.exports = {

    /**
     * 可以匿名访问的资源
     */
    anonymous: () => {
        return (req, res, next)=> {
            next();
        }
    },
    /**
     * 只允许登录用户访问资源
     */
    token: () => {
        return (req, res, next) => {
            var pattern = new RegExp('/fonts|css|js|images|vendor/*');

            if(pattern.test(req.url)){
                //公共部分，放行
                next();
                return;
            }

            const token = req.cookies['token'];
            let expire;

            if (token) {
                if (req.user && req.user.id) {
                    //token有效，放行
                    next();
                    return;
                } else {
                    //token已过期
                    expire = true;
                }
            } else {
                expire = false;
            }

            //token过期或无效处理
            if (expire) {
                //token已失效, 清理cookie
                res.locals.tokenExpired = true;
                res.clearCookie('token');
            }

            if (req.xhr) {
                res.status(401).send({
                    success: false,
                    tokenExpired: expire,
                    error: 'Unauthorized access is not allowed.'
                });
            } else {
                //拦截需要登录的请求, 转向登录页
                let access = req.url;
                res.redirect('/login?access=' + new Buffer(access).toString('base64'));
            }
        };
    },
    /**
     * 只允许登录且具有某项权限的用户访问资源
     */
    privilege : (p) => {
        return (req, res, next) => {
            if ((req.user && req.user.privileges && req.user.privileges.length && req.user.privileges.indexOf(p) != -1) || (req.user && req.user.mockBy && req.user.mockBy.privileges && req.user.mockBy.privileges.length && req.user.mockBy.privileges.indexOf(p) != -1)) {
                next();
            } else {
                if (req.xhr) {
                    res.status(401).send({
                        success: false,
                        error: 'Unauthorized access is not allowed.'
                    });
                } else {
                    //拦截需要登录的请求, 转向登录页
                    let access = req.url;
                    res.redirect('/login?access=' + new Buffer(access).toString('base64'));
                }
            }
        }
    }
};