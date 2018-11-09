let controller = {};
let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "Employee"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});


controller.GetAllDepartments = function (req, res) {
    try {
        con.query('SELECT *FROM  tblDepartments', function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    } catch (e) {
        console.log(e);
    }
};



controller.getAllEmployees = function (req, res) {
    try {
        let pageDataLimit = 10;
        let innerData = req.params.page;
        let end = innerData * pageDataLimit;
        let begin = innerData * pageDataLimit - pageDataLimit;
        let sql = "SELECT * FROM tblEmployees JOIN tblDepartments ON tblEmployees.emp_dpID = tblDepartments.dpID " +
            "LIMIT " + begin + ", " + end;
        console.log(sql);
        con.query(sql, function (err, result, fields) {
            console.log(result);
            if (err) throw err;
            result.forEach((item)=> {
                if (item.empActive === '1'){
                    item.empActive = true
                } else {
                    item.empActive = false
                }
            });
            let fullResult = {
                employees : result,
                fullLengthInTable : 0
            };
            let sql2 = 'SELECT COUNT(*) FROM tblEmployees';
            con.query(sql2, function (err, resultIn, fields) {
                if (err) throw err;
                fullResult.fullLengthInTable = resultIn[0]['COUNT(*)'];
                res.json(fullResult);
            });
        });
    }catch (e) {
        console.log(e);
    }

};
controller.addEmployee = function (req, res) {
    try {
        let innerObj = req.body;
        console.log(req.body);
        if (innerObj.empActive === ""){
            innerObj.empActive = false
        }
        let  sql = 'insert into tblEmployees(empName, empActive, emp_dpID) VALUES?';
        let value = [
            [
                innerObj.empName,
                innerObj.empActive,
                innerObj.emp_dpID
            ]
        ];
        con.query(sql, [value], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.json("Added New Employee")
    }catch (e) {
        console.log(e);
    }

};


controller.deleteEmployee = function (req, res) {
    try {
        var sql = 'DELETE FROM tblEmployees WHERE empID = ' + req.params.id;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("removed item");
            res.json("Deleted")
        });
    }catch (e) {
        console.log(e);
    }


};


controller.updateEmployee = function (req, res) {
    try {
        let objToUpdate = req.body;
        let sql = 'UPDATE tblEmployees' +
            ' SET empName = ' + "'" + objToUpdate.empName + "'" +
            ', empActive = '  + objToUpdate.empActive +
            ', emp_dpID = ' + objToUpdate.emp_dpID +
            ' WHERE empID = ' + objToUpdate.empID;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Updated")
        });
    }catch (e) {
        console.log(e);
    }

};


controller.searchEmployee = function (req, res) {
    try {
        let sql = 'SELECT * FROM tblEmployees JOIN tblDepartments ON tblEmployees.emp_dpID = tblDepartments.dpID WHERE tblEmployees.empName LIKE '
            + '"'+ req.params.empName  + '%' +'"';
        con.query( sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result)
        });
    }catch (e) {
        console.log(e);
    }

};

module.exports = controller;

