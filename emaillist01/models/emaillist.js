const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    findAll: async function() {
        const conn = dbconn();
        // const query = (sql, data) => {
        //     return new Promise((resolve, reject) => {
        //         conn.query(sql, data, (error, rows, field)=>{
        //             error ? reject(error): resolve(rows);
        //         });
        //     });
        // }
        const query = util.promisify(conn.query).bind(conn);

        try{
            /* 비동기로 인해 return 값이 null 임.
            let results = null;
                conn.query("select first_name, last_name, email from email_list01 order by id desc", [], function(error, rows, field){
                    
                    results = rows;
                    console.log("sql callback:" + results);
                });
            */

            return await query("select first_name, last_name, email from email_list01 order by id desc", []);
        } catch(e) {
            console.error(e);
        } finally{
            conn.end();
        }

    },
    insert: async function(emaillist) {
        console.log(emaillist);
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try{
            // return await query("insert into email_list01 values(null, ?, ?, ?)", 
            //                     [emaillist.fn, emaillist.ln, emaillist.email]);
            return await query("insert into email_list01 values(null, ?, ?, ?)", 
                                Object.values(emaillist));
        } catch(e) {
            console.error(e);
        } finally{
            conn.end();
        }
    },

}