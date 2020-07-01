var env = 'test';

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
    imgCode: '/user/imgCode',
    // 2、用户注册
    register: '/open/register',
    // 登录
    login: '/user/login',
    // 4、修改密码
    changePwd: '/user/changePwd',
    // 5、模块列表
    moduleList: '/open/moduleList',
    // 6、所属分类列表
    typeList: '/type/list/1',
    // 7、视频信息分页 
    videoPages: '/open/videoPages',
    // 8、图片信息分页  
    filePages: '/open/filePages',
    // 9、文章信息分页 
    subjectPages: '/open/subjectPages',
    // 10、问题信息分页 
    questionPages: '/open/questionPages',
    // 11、职位信息分页 
    postionPages: '/open/postionPages',
    // 12、我的问题 
    myQuestions: '/question/myQuestions',
    // 13、问题创建 
    save: '/question/save',
    // 14、问题的回复记录 
    pages: '/questionAnswer/pages',
    // 15、用户应聘职位 
    acceptPostion: '/postionAccept/acceptPostion',
    // 16、查询本人是否应聘过 
    postionId: '/postionAccept/acceptPostion'
}

var urlAll = env === 'test' ? obj1 : obj2;