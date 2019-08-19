var config = require('./config');
const sql = require('mssql');




async function addParticipant(firstname,lastname,email, telephone, method, disabled, moredetail, describe, licensed, date) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = add(firstname,lastname,email, telephone, method, disabled, moredetail, describe, licensed, date); 

    sqlResult['participant'] = await q;

    sql.close()
    return sqlResult;
}

async function add(firstname,lastname,email, telephone, method, disabled, moredetail, describe, licensed, date ) {
    try {       

        return await  sql.query("INSERT INTO Participants (FirstName, LastName, Email, Phone, Method, Disability, DisabilityDetail, UserType, Licensed, Created) VALUES ('" +
        firstname + "','" +
        lastname + "','" +
        email + "','" +
        telephone + "','" +
        method + "','" +
        disabled + "','" +
        moredetail + "','" +
        describe + "','" +
        licensed + "','" +
        date + "')");

    } catch (err) {
        console.log(err);
    }
}


module.exports = addParticipant;