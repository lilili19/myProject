// var env = 'test';
var env = '';

var host = 'http://47.106.161.65';

var obj1 = {
    // 1、获取验证码
    imgCode: '/json/imgCode.json',
    // 2、用户注册
    register: '/json/register.json',
    // 登录
    login: '/json/login.json',
    // 4、修改密码
    changePwd: '/json/changePwd.json',
    // 5、模块列表
    moduleList: '/json/moduleList.json',
    // 6、所属分类列表
    typeList: '/json/typeList.json',
    // 7、视频信息分页 
    videoPages: '/json/videoPages.json',
    // 8、图片信息分页  
    filePages: '/json/filePages.json',
    // 9、文章信息分页 
    subjectPages: '/json/subjectPages.json',
    // 10、问题信息分页 
    questionPages: '/json/questionPages.json',
    // 11、职位信息分页 
    postionPages: '/json/postionPages.json',
    // 12、我的问题 
    myQuestions: '/json/myQuestions.json',
    // 13、问题创建 
    save: '/json/save.json',
    // 14、问题的回复记录 
    pages: '/json/pages.json',
    // 15、用户应聘职位 
    acceptPostion: '/json/acceptPostion.json',
    // 16、查询本人是否应聘过 
    postionId: '/json/postionId.json'
}

var obj2 = {
    // 1、获取验证码
    imgCode: host + '/user/imgCode',
    // 2、用户注册
    register: host + '/open/register',
    // 登录
    login: host + '/user/login',
    // 4、修改密码
    changePwd: host + '/user/changePwd',
    // 5、模块列表
    moduleList: host + '/open/moduleList',
    // 6、所属分类列表
    typeList: host + '/open/typeList',
    // 7、视频信息分页 
    videoPages: host + '/open/videoPages',
    // 8、图片信息分页  
    filePages: host + '/open/filePages',
    // 9、文章信息分页 
    subjectPages: host + '/open/subjectPages',
    // 10、问题信息分页 
    questionPages: host + '/open/questionPages',
    // 11、职位信息分页 
    postionPages: host + '/open/postionPages',
    // 12、我的问题 
    myQuestions: host + '/question/myQuestions',
    // 13、问题创建 
    save: host + '/question/save',
    // 14、问题的回复记录 
    pages: host + '/open/questionAnswer/pages',
    // 15、用户应聘职位 
    acceptPostion: host + '/postionAccept/acceptPostion',
    // 16、查询本人是否应聘过 
    postionId: host + '/postionAccept/get',
    // 18、获取短信验证码
    smsCode: host + '/user/smsCode',
    // 手机号登陆
    mobileLogin: host + '/user/mobileLogin'
}


var urlAll = env === 'test' ? obj1 : obj2;

function ajaxHttp() {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    // const { token } = user;
    const token = user.token;
    Vue.http.headers.common['Authorization'] = token;
}

var liMessage = {
    successHtml: function (content) {
        return '<div class="li_icon_success">'
            + '<img src="./images/success.png" style="height: 13px;" />'
            + '<p></p>'
            + '<div class="li_moban">'
            + '<div></div>'
            + '</div>'
            + '</div>'
            + '<span>' + content + '</span>';
    },
    errorHtml: function (content) {
        return '<div class="li_icon_success li_icon_error">'
            + '<div class="li_error li_error1"></div>'
            + '<div class="li_error_moban li_1"></div>'
            + '<div class="li_error li_error2"></div>'
            + '<div class="li_error_moban li_2"></div>'
            + '</div>'
            + '<span>' + content + '</span>';
    },
    infoHtml: function (content) {
        return '<div class="li_icon_info">'
            + '<img src="./images/info.png" style="height: 16px;" />'
            + '</div>'
            + '<span>' + content + '</span>';
    },
    success: function (obj, callBack) {
        if (typeof (obj) === "string") {
            obj = {
                content: obj,
                time: 3000
            }
        }
        var div = document.createElement('div');
        div.className = 'li_messageTips';
        div.innerHTML = this.successHtml(obj.content || '');
        document.body.appendChild(div);
        this.timeOut(obj.time || 3000, div, callBack);
    },
    error: function (obj, callBack) {
        if (typeof (obj) === "string") {
            obj = {
                content: obj,
                time: 3000
            }
        }
        var div = document.createElement('div');
        div.className = 'li_messageTips';
        div.innerHTML = this.errorHtml(obj.content || '');
        document.body.appendChild(div);
        this.timeOut(obj.time || 3000, div, callBack);
    },
    info: function (obj, callBack) {
        if (typeof (obj) === "string") {
            obj = {
                content: obj,
                time: 3000
            }
        }
        var div = document.createElement('div');
        div.className = 'li_messageTips';
        div.innerHTML = this.infoHtml(obj.content || '');
        document.body.appendChild(div);
        this.timeOut(obj.time || 3000, div, callBack);
    },
    timeOut: function (time, div, callBack) {
        setTimeout(function () {
            div.style.opacity = 0;
            div.style.animation = 'li_messageTips_time 0.3s linear';
            setTimeout(function () {
                document.body.removeChild(div);
                callBack && callBack();
            }, 300)
        }, time);
    }
}

function messageTips(type, content, callBack) {
    liMessage[type](content, callBack);
}