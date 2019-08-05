
/*
    时间转化
*/ 
const timeConversion = (date, format) => {
    const newDate = new Date(date);
    const Y = newDate.getFullYear(),
          M = (newDate.getMonth() + 1) < 10 ? ('0'+(newDate.getMonth()+1)) : (newDate.getMonth()+1),
          D = newDate.getDate() < 10 ? ('0'+newDate.getDate()) : newDate.getDate(),
          H = newDate.getHours() < 10 ? ('0'+newDate.getHours()) : newDate.getHours(),
          Min = newDate.getMinutes() < 10 ? ('0'+newDate.getMinutes()) : newDate.getMinutes(),
          S = newDate.getSeconds() < 10 ? ('0'+newDate.getSeconds()) : newDate.getSeconds();
    let nowDate = '';
    switch(format) {
        case 'YY-MM-DD HH:MM:SS':
            nowDate = Y + '-' + M + '-' + D + ' ' + H + ':' + Min + ':' + S;
            break;
        case 'HH:MM':
            nowDate = H + ':' + Min;
            break;
    }
    return nowDate;
}


module.exports = {
    timeConversion
}