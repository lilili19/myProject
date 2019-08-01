
var mysql = require('mysql');
var { mySqlPassword } = require('../config');
class operationMySql {
    constructor(sqlName, map) {
        // this.map = map;
        // this.connection = mysql.createConnection({
        //     host     : 'localhost',
        //     user     : 'root',
        //     password : '123456',
        //     database : sqlName,
        //     multipleStatements: true // 支持执行多条 sql 语句
        // });
        // this.connection.connect();
    }
    createConnection(sqlName) {
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : mySqlPassword,
            database : sqlName,
            multipleStatements: true // 支持执行多条 sql 语句
        });
        this.connection.connect();
    }
    setMap(map) {
        this.map = map;
    }
    query(obj, callBack, {pageIndex, pageSize}={}, vague) {
        const self = this;
        return new Promise(function(resolve, reject) {
            let sql =  `SELECT * FROM ${self.map}`;
            let condition = '', queryArray = null;
            for(let key in obj) {
                if(obj[key] instanceof Array) {
                    queryArray = obj[key].map(e => {
                        const value = typeof(e) === 'number' ? e : (`"${e}"`);
                        return `${sql} WHERE ${key}=${value}`;
                    })
                } else if(obj[key] !== null && obj[key] !== undefined) {
                    const value = typeof(obj[key]) === 'number' ? obj[key] : (`"${obj[key]}"`);
                    condition += condition ? ` and ${key}=${value}` : `${key}=${value}`;
                }
            }
            let condition2 = '';
            if(vague) {
                for(let key in vague) {
                    const value = typeof(vague[key]) === 'number' ? vague[key] : (`"%${vague[key]}%"`);
                    condition2 += condition2 ? ` and ${key} like ${value}` : `${key} like ${value}`;
                }
                if(condition && condition2) condition2 = ' and ' + condition2;
            }
            sql += `${condition || condition2 ? ' WHERE ' : ''}${condition ? condition + ' ' : ''}${condition2}`;
            if(pageIndex) {
                sql += ` LIMIT ${pageSize * (pageIndex - 1)}, ${pageSize}`;
                sql += `;SELECT count(*) FROM ${self.map} ${condition || condition2 ? ' WHERE ' : ''}${condition ? condition + ' ' : ''}${condition2}`;
            }
            if(queryArray instanceof Array) {
                sql = queryArray.join(';');
            }
            // console.log(sql);
            self.connection.query(sql, (error, results, fields) => {
                if (error) return self.error(error, callBack, resolve);
                self.success(results, callBack, resolve);
            });
        })
    }
    add(obj, callBack) {
        const self = this;
        return new Promise(function(resolve, reject) {
            let keys = '', values = '';
            for(let key in obj) {
                if(obj[key] !== null && obj[key] !== undefined) {
                    const value = typeof(obj[key]) === 'number' ? obj[key] : (`"${obj[key]}"`);
                    keys += keys ? `,${key}`: key;
                    values += values ? `,${value}` : value;
                }
            }
            const sql = `INSERT INTO ${self.map}(${keys}) VALUES(${values})`;
            // console.log(sql);
            self.connection.query(sql, (error, results, fields) => {
                if (error) return self.error(error, callBack, resolve);
                self.success(results, callBack, resolve);
            });
        })
    }
    update(obj, callBack, where) {
        const self = this;
        return new Promise(function(resolve, reject) {
            let condition = '', whereCondition = '';
            for(let key in obj) {
                if(obj[key] !== null && obj[key] !== undefined) {
                    const value = typeof(obj[key]) === 'number' ? obj[key] : (`"${obj[key]}"`);
                    condition += condition ? `,${key}=${value}` : `${key}=${value}`;
                }
            }
            for(let key in where) {
                if(where[key] !== null && where[key] !== undefined) {
                    const value = typeof(where[key]) === 'number' ? where[key] : (`"${where[key]}"`);
                    whereCondition = `${key} = ${value}`;
                }
            }
            const sql = `UPDATE ${self.map} SET ${condition} WHERE ${whereCondition}`;
            // console.log(sql);
            self.connection.query(sql, (error, results, fields) => {
                if (error) return self.error(error, callBack, resolve);
                self.success(results, callBack, resolve);
            });
        })
    }
    del(obj, callBack) {
        const self = this;
        return new Promise(function(resolve, reject) {
            let condition = '';
            for(let key in obj) {
                if(obj[key] !== null && obj[key] !== undefined) {
                    if(obj[key] instanceof Array) { // 如果是数组，则删除多项
                        obj[key].forEach(e => {
                            const str = typeof(e) === 'number' ? e : (`"${e}"`);
                            condition += condition ? ` or ${key}=${str}` : `${key}=${str}`;
                        });
                    } else {
                        const value = typeof(obj[key]) === 'number' ? obj[key] : (`"${obj[key]}"`);
                        condition += condition ? ` and ${key}=${value}` : `${key}=${value}`;
                    }
                }
            }
            const sql = `DELETE FROM ${self.map} WHERE ${condition}`;
            // console.log(sql);
            self.connection.query(sql, (error, results, fields) => {
                if (error) return self.error(error, callBack, resolve);
                self.success(results, callBack, resolve);
            });
        });
    }
    end() {
        this.connection.end();
    }
    success(results, callBack, resolve) {
        callBack(true,results);
        resolve();
    }
    error(error, callBack, resolve) {
        console.log('[SELECT ERROR] - ',error.message);
        callBack(false, null);
        resolve();
    }
};
module.exports = operationMySql;