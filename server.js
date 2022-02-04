// Requiring modules
const express = require('express');
const app = express();
const mysql = require("mysql");
app.use(express.json())

//creating a connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mulesoft"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// populating the DB
app.get('/', function (req, res) {
    

    //checking if database mulesoft is empty
      var sql = "SELECT COUNT(DISTINCT table_name) AS TotalNumberOfTables FROM information_schema.columns WHERE table_schema = 'mulesoft'"
      con.query(sql, function (err, result) {
        if (err) 
            console.log(err)
    
        var res =  JSON.parse(JSON.stringify(result))

        //if empty
        if(res[0].TotalNumberOfTables === 0){
        var sql2 = "CREATE TABLE movie (Movie_Id int AUTO_INCREMENT PRIMARY KEY,movieName VARCHAR(255), actor VARCHAR(255), actress VARCHAR(255), director VARCHAR(255), yearOfRelease date)"
        var sql3 = "INSERT INTO movie (movieName,actor,actress,director,yearOfRelease ) VALUES ('The Details','Tobey Maguire','Elizabeth Banks','Jacob Estes','2011-11-02'), ('Forrest Gump','Tom Hanks','Robin Wright','Robert Zemeckis','1994-07-06'), ('The Pursuit of Happyness','Will Smith','Thandiwe Newton','Gabriele Muccino','2006-12-15'), ('Avengers: Infinity War','Robert Downey Jr.','Scarlett Johansson','Anthony Russo','2018-04-27'), ('Pushpa','Allu Arjun','Rashmika Mandanna','Sukumar','2021-12-07')"
        con.query(sql2,function (err,result) {
            if(err)
                console.log(err)
        }) 
        con.query(sql3,function (err,result) {
            if(err)
                console.log(err)
        })       
            }
        //else do nothing as values already exist.....
    });
    
    
    res.send("The TABLE HAS BEEN CREATED, GOTO: http://localhost:5000/display to DISPLAY or http://localhost:5000/insert on postman to INSERT more movies")

});

//get method
app.get('/display', function (req, res) {
    console.log("display route")
    var sql = "SELECT * from movie";
    con.query(sql,function (err,result) {
        if(err)
            console.log(err)

        return res.send(result)
    })   
    
})
//insert method
app.post('/insert', function(req,res){
    console.log("insert route")
    console.log(req.body[0]);
        //inserting multiple  objects
    for(var i = 0;i<req.body.length;i++){
        var movieName = req.body[i].movieName;
        var actor = req.body[i].actor;
        var actress = req.body[i].actress;
        var director = req.body[i].director;
        var yearOfRelease = req.body[i].releaseDate;

        var sql = "INSERT INTO movie (movieName,actor,actress,director,yearOfRelease) value('" +movieName+ "','" +actor+ "','" +actress+ "','" +director+ "','" +yearOfRelease+"')"
        console.log(sql)
        con.query(sql,function (err,result) {
            if(err)
                console.log(err)
        })    
    }
    
    res.send("hello")
})


  
var server = app.listen(5000, function () {
	console.log('Server is listening at port 5000...');
});
