const dbconn = require("./dbconn");
const util = require("util");

module.exports = {
    index: async () =>{
        const conn = dbconn();
        const query = (sql, data) =>{
            return new Promise((resolve, reject) =>{
                conn.query(sql, data, (error, rows, field) =>{
                    !error ? resolve(rows) : reject(error);
                })
            })
        }
        
        try{
            return await query("select id, name, message, date_format(reg_date, '%Y-%m-%d %H:%i:%s') as regDate from guestbook order by id desc",[]);
        } catch(e) {
            console.log(e);
        } finally {
            conn.end();
        }
    },

    add: async (guestbookVo) => {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try{
            return await query("insert into guestbook values (null, ?, ?, ?, now())",
                                [guestbookVo.name, guestbookVo.password, guestbookVo.message]);
        } catch(e) {
            console.log(e);
        } finally {
            conn.end();
        }
    },

    delete: async (guestbookVo) => {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try{
            return await query("delete from guestbook where id = ? and password = ?",
                                [guestbookVo.id, guestbookVo.password]);
        } catch(e) {
            console.log(e);
        } finally {
            conn.end();
        }
    }
}