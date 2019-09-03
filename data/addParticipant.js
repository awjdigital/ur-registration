var config = require('./config');
const sql = require('mssql');




async function addParticipant(firstname,lastname,email, telephone, method, assistive, assistiveOther, describe, licensed, location, source, sourceOther,describeOther,tech, date) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = add(firstname,lastname,email, telephone, method, assistive, assistiveOther, describe, licensed, location, source, sourceOther,describeOther,tech, date); 

    sqlResult['participant'] = await q;

    sql.close()
    return sqlResult;
}

async function add(firstname,lastname,email, telephone, method, assistive, assistiveOther, describe, licensed, location, source, sourceOther,describeOther, tech, date ) {
    try {       

        return await  sql.query("INSERT INTO Participants (FirstName, LastName, Email, Phone, Method, Assistive, AssistiveOther, UserType, UserTypeOther, Licensed, Location, Source, SourceOther, Tech, Created) VALUES ('" +
        firstname + "','" +
        lastname + "','" +
        email + "','" +
        telephone + "','" +
        method + "','" +
        assistive + "','" +
        assistiveOther + "','" +
        describe + "','" +
        describeOther + "','" +
        licensed + "','" +
        location + "','" +
        source + "','" +
        sourceOther + "','" +        
        tech + "','" +
        date + "')");

    } catch (err) {
        console.log(err);
    }
}


module.exports = addParticipant;