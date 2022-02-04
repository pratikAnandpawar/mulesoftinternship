//steps to follow for project initialization
1)run command "npm i" to install all node packages
2)within the server.js file, in the con object, change the username and password according to your sql credentials
3)create a database in sql named "mulesoft"
4)run the command "node server" to start the node server and goto "http://localhost:5000/"


//displaying values 
1)goto "http://localhost:5000/display"


//inserting more values manually on "http://localhost:5000/insert" route on postman ONLY
1)add new POST req on postman with he above route
2)select raw in body and insert data in following format to insert multiple movies:
            [   
    {
     "movieName" : "pratik",
     "actor" : "pratik",
     "actress" : "pratik",
     "director" : "pratik",
     "releaseDate" : "2000-04-13"
    },
    {
     "movieName" : "sadad",
     "actor" : "pdfdfdsratdfsfik",
     "actress" : "prafdsfsdfdsdsfsftik",
     "director" : "prafsdfaqewdtik",
     "releaseDate" : "2000-04-13"
    }
]
3)The changes should take place on sql server




//project description
The database is populated once the '/' route is hit ONLY if the database is empty. 
We can then check the data using '/display' route and insert more data through postman using '/insert' route.