/**
 * 写返回结果公共函数
 * Created by hongjiyao_2014150120 on 16-12-31.
 */

/**
 * 写返回结果
 * @param res 请求
 * @param ret 返回结果 出错为null
 * @param success 请求是否成功
 * @param statusNum 状态码
 * @param msg 报错信息
 */
let jsonWrite = function(res, ret, success, statusNum, msg) {
    if(!success) {
        res.status(statusNum).json({
            code: -1,
            msg: msg
        }).end();
    } else {
        res.status(200).json({
            code: 0,
            data: ret
        }).end();
    }
};

module.exports = jsonWrite;
