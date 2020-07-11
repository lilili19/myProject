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
    postionId: host + '/postionAccept/get'
}


var urlAll = env === 'test' ? obj1 : obj2;

function ajaxHttp() {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    const { token } = user;
    Vue.http.headers.common['Authorization'] = token;
}