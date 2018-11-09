let express = require('express');
let cors = require("cors");
let app = express();
let controller = require('./Controllers/controllers');

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // con.query("CREATE DATABASE Employee", function (err, result) {
//     //     if (err) throw err;
//     //     console.log("Database created");
//     // });
//     let sql = "create table tblEmployees(empID  integer PRIMARY KEY AUTO_INCREMENT, empName varchar(50), empActive varchar(50), emp_dpID integer)";
//     // let sql = "create table tblDepartments(dpID integer PRIMARY KEY AUTO_INCREMENT, dpName varchar(50))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.get('/getAllDpt/', controller.GetAllDepartments);
app.get('/getAllEmp/:page', controller.getAllEmployees);
app.post('/addEmp/', controller.addEmployee);
app.delete('/deleteEmp/:id', controller.deleteEmployee);
app.put('/updateEmp', controller.updateEmployee);
app.get('/searchEmp/:empName', controller.searchEmployee);



app.use((err, req, res, next)=>{
    res.status(500).json({
        message : err.msg,
        status : err.status
    })
});


app.listen(3000, function (err) {
    console.log('Listening...');
});

