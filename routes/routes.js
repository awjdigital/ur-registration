const express = require('express')
const router = express.Router();

var config = require('../data/config.js');
const sql = require('mssql');



function ConnectToDB() {
    sql.connect(config, (err) => {
        if (err) return console.log('Could not create DB Connection!');
        console.log('Successfully Connected to Database!');
    });
}


require('dotenv').config()
var err = false;

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NotifyKey);


// Add your routes here - above the module.exports line

router.get('/', (req, res) => {
    req.session.cya = 'n';
    req.session.data = {};
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/register-profile', (req, res) => {
    res.render('register-profile')
})

router.get('/register-gambling', (req, res) => {
    res.render('register-gambling')
})

router.get('/register-optional', (req, res) => {
    res.render('register-optional')
})

router.get('/register-contact', (req, res) => {
    res.render('register-contact')
})

router.get('/register-source', (req, res) => {
    res.render('register-source')
})
router.get('/register-location', (req, res) => {
    res.render('register-location')
})

router.get('/register-method', (req, res) => {
    res.render('register-method')
})

router.get('/register-check', (req, res) => { 
    req.session.cya = 'y';

    var method = req.session.data['method'].toString();
    var methodlist = method.split(',');

    var equipment = req.session.data['equipment'].toString();
    var equipmentList = equipment.split(',');

    var source = req.session.data['source'].toString();
    var sourceList = source.split(',');

    res.render('register-check',{
        methodlist,
        equipmentList,
        sourceList
    })
})

router.get('/register-complete', (req, res) => {


    res.render('register-complete')
})

router.post('/register', (req, res) => {



    err = false;
    var err_first_name = false;
    var err_last_name = false;


    if (req.body['first-name'] === "") {
        err = true;
        err_first_name = true;
    }

    if (req.body['last-name'] === "") {
        err = true;
        err_last_name = true;
    }

    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {

        if (err) {
            res.render('register', {
                err,
                err_first_name,
                err_last_name
            })
        } else {

            res.redirect('register-profile')
        }
    }
})

router.post('/register-profile', (req, res) => {

    err = false;
    var describe = false;


    if (req.body['describe'] === undefined) {
        err = true;
        describe = true;
    }



    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-profile', {
                err,
                describe
            })
        } else {

            res.redirect('register-gambling')
        }
    }
})

router.post('/register-gambling', (req, res) => {
    err = false;
    var licensed = false;


    if (req.body['licensed'] === undefined) {
        err = true;
        licensed = true;
    }


    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-gambling', {
                err,
                licensed
            })
        } else {
            res.redirect('register-method')
        }
    }
})

router.post('/register-method', (req, res) => {
    err = false;
    var method = false;


    if (req.body['method'] === undefined) {
        err = true;
        method = true;
    }



    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-method', {
                err,
                method
            })
        } else {
            res.redirect('register-contact')
        }
    }
})

router.post('/register-contact', (req, res) => {
    err = false;
    var err_email = false;
    var err_telephone_number = false;


    if (req.body['email'] === "") {
        err = true;
        err_email = true;
    }

    if (req.body['telephone-number'] === "") {
        err = true;
        err_telephone_number = true;
    }

    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {

        if (err) {
            res.render('register-contact', {
                err,
                err_email,
                err_telephone_number
            })
        } else {

            res.redirect('register-source')
        }
    }
})

router.post('/register-source', (req, res) => {

    err = false;
    var source = false;


    if (req.body['source'] === undefined) {
        err = true;
        source = true;
    }
   


    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-source', {
                err,
                source
            })
        } else {
            res.redirect('register-location')
        }
    }
})

router.post('/register-location', (req, res) => {

    err = false;
    var location = false;


    if (req.body['country'] === "") {
        err = true;
        location = true;
    }
   


    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-location', {
                err,
                location
            })
        } else {
            res.redirect('register-optional')
        }
    }
})

router.post('/register-optional', (req, res) => {

    err = false;
    var equipment = false;


    if (req.body['equipment'] === undefined) {
        err = true;
        equipment = true;
    }

    


    if (req.session.cya === 'y') {
        res.redirect('register-check')
    } else {
        if (err) {
            res.render('register-optional', {
                err,
                equipment
            })
        } else {
            res.redirect('register-check')
        }
    }
})

router.post('/register-check', (req, res) => {

    sql.close();
    var firstname = req.session.data['first-name'];
    var lastname = req.session.data['last-name'];
    var describe = req.session.data['describe'];
    var licensed = req.session.data['licensed'];
    var email = req.session.data['email'];
    var telephone = req.session.data['telephone-number'];
    var assistive = req.session.data['equipment'];
    var assistiveOther = req.session.data['equipment-other'];
    var method = req.session.data['method'];    
    var source = req.session.data['source'];    
    var location = req.session.data['country'];  
    var sourceOther = req.session.data['source-other'];  

    if(describe === 'I am a member of the public'){
        describe = 'Public'
    }

    if(describe === 'I work in the gambling industry'){
        describe = 'Gambling industry'
    }

    if(describe === 'I work for a charity'){
        describe = 'Charity sector'
    }

    if(describe === 'I work in the media/news industry'){
        describe = 'Media'
    }
    
    if(describe === 'I work in the medical profession'){
        describe = 'Healthcare'
    }

    if(describe === 'I work in the education sector'){
        describe = 'Education'
    }

 

    // Save to DB



    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(date);

    const addParticipant = require('../data/addParticipant.js');
    

    addParticipant(firstname,lastname,email, telephone, method, assistive, assistiveOther, describe, licensed, location, source, sourceOther,date)

    // Send notification
    notify
        .sendEmail(process.env.newregistrationemail, process.env.recipient, {
            personalisation: {
                'first-name': firstname,
                'last-name': lastname,
                'describe': describe,
                'licensed': licensed,
                'email': email,
                'telephone-number': telephone,
                'disabled': assistive,
                'more-detail': assistiveOther
                
            }
        })
        .then(response => console.log("Sent"))
        .catch(err => console.error("errored"))

    notify
        .sendEmail(process.env.useremail, email, {
            personalisation: {
                'first-name': firstname
            }
        })
        .then(response => console.log("Sent"))
        .catch(err => console.error("errored"))


    res.redirect('register-complete')
})



module.exports = router