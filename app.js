const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
let path = require('path');
// let value = require("../pblmyself/public/js/login.js");
// module.exports = app;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "pbl",
    password: "Tejas@6504"
});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req,res) => {
   req.flash("Hello There");
   });
   

app.get('/main', async (req,res) => {
    
        res.render("main.ejs");
});



//create route 
app.get('/main/login', (req,res) => {
       res.render("login.ejs");
})

app.get('/mainlogin/:id', async (req,res) => {
    let {id} = req.params;
    // console.log(id);
   
    try{
   
        await connection.query("select * from user where id = ?",id,(err,result) => {
                if(err) throw err;
                // console.log(result);
                res.render("mainlogin.ejs",{data : result});
            })
        } catch(err){
            console.log(err);
        }
})

app.post("/main/login",async(req,res) => {
    let {user,email2,pass2,passcon,email,pass} = req.body;

let id =Math.floor(Math.random() * (1000000000));

      try{
        
        if(req.body.user != undefined)
        {
        await connection.query("insert into user (id,username,email,password) values (? ,? ,? ,?) ",[id,req.body.user,req.body.email2,req.body.pass2],(err,result) => {
             if(err) throw err;
              res.redirect("/main/login");         
         })
        }else
        {
            connection.query("select * from user where email = ?",[req.body.email],(err,result) => {
                if(err) throw err;
                if(req.body.pass == result[0].password)
                {
                        res.redirect(`/mainlogin/${result[0].id}`); 
                }else
                {
                    res.redirect("/login");     
             }
            })
        }
     } catch(err){
         console.log(err);
     }

     try{
       
     } catch(err){
        
         console.log(err);
     }

})

// app.get('/logindone', (req,res) => {
//     res.sendFile(__dirname+"/mainloginedin.html");
// })

// app.post('/login',(req,res)=>{
// })

app.get('/mainlogin/:id/register', (req,res) => {
    let {id} = req.params;
    console.log(id);

    try{
    connection.query("select * from register where id = ? ",id,(err,result) => {
        if(err) throw err;
        // console.log(result[0]);
        if(result[0] == undefined)
        {
            connection.query("select * from user where id = ? ",id,(err,result) => {
                if(err) throw err;
            res.render("register.ejs",{data : result});
          })
        }
        else{
            res.render("registeredit.ejs",{data: result});
        }
           
    })
} catch(err){
    console.log(err);
}

 
    // res.render("register.ejs", {});
})

app.post("/mainlogin/:id/registerdone",(req,res) => {
    let {id} = req.params;

  let {fname,lname,age,email,password,dob,gender,phoneno} = req.body;

         try{ 
            connection.query("insert into register(id,firstname,lastname,age,email,password,DateofBirth,Gender,phoneno) values (?,?,?,?,?,?,?,?,?) ",[id,req.body.fname,req.body.lname,req.body.age,req.body.email,req.body.password,req.body.dob,req.body.gender,req.body.phoneno],(err,result) => {
                if(err) throw err;
                res.redirect(`/mainlogin/${id}`);
            })
        } catch(err){
            console.log(err);
        }
})
    
app.post("/mainlogin/:id/edit",(req,res)=>{
let {id} = req.params;
let {fname,lname,age,email,password,dob,gender,phoneno} = req.body;

    try{
        connection.query("update register set firstname=?,lastname=?,age=?,email=?,password=?,DateofBirth=?,Gender=?,phoneno=? where id = ?",[req.body.fname,req.body.lname,req.body.age,req.body.email,req.body.password,req.body.dob,req.body.gender,req.body.phoneno,id],(err,result) => {
            if(err) throw err;
            res.redirect(`/mainlogin/${id}/register`)
        })
     }
      catch(err){
            console.log(err);
        }
})



//-----------------FOR HOTELS------------------------//
app.get("/mainlogin/:id/hotels",async (req,res) =>{
    let {id} = req.params;

    try{
        await connection.query("select * from hotels",(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotels.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }

});

app.get("/mainlogin/hotels/add",(req,res)=>{
    res.render("hotels/hotelform.ejs");
 });

app.get("/mainlogin/hotels/:h_id",async (req,res)=>{
    let {h_id} = req.params;
    //  console.log(h_id);
    try{
        await connection.query("select * from hotels where h_id = ?",h_id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotelsdetails.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }
});



app.post("/mainlogin/hotels/add",async(req,res)=>{
 let {id} = req.params;
 let {title,description,image,price,location,country} = req.body;
 console.log(id);

    try{
        await connection.query("insert into hotels(title,description,image,price,location,country) values (?, ?, ?, ?, ?, ?) ",[req.body.title,req.body.description,req.body.image,req.body.price,req.body.location,req.body.country],(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
        //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
        res.redirect(`/mainlogin/${id}/hotels`);
        })
    } catch(err){
        console.log(err);
    }

 });

 app.get("/mainlogin/hotels/:h_id/edit",(req,res)=> {
       let {h_id} = req.params;
 
       try{
        connection.query("select * from hotels where h_id = ? ",h_id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotelformedit.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }

       
 });

 app.post("/mainlogin/hotels/:h_id/edit",(req,res) => {
     
    let {h_id} = req.params;
 let {title,description,image,price,location,country} = req.body;
//   console.log(req.body);

     try{
          connection.query("update hotels set title = ?,description =?,image =?,price=?,location=?,country=? where h_id = ? ",[req.body.title,req.body.description,req.body.image,req.body.price,req.body.location,req.body.country,h_id],(err,result) => {
             if(err) throw err;
             // hotels =[id,result];
         //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
         res.redirect(`/mainlogin/hotels/${h_id}`);
         })
     } catch(err){
         console.log(err);
     }
 })

 app.get("/mainlogin/hotels/:h_id/delete", (req,res) => {
    let {h_id} = req.params;
    let {id} = req.params;

    try{
        connection.query("delete from hotels where h_id = ? ",h_id,(err,result) => {
           if(err) throw err;
           // hotels =[id,result];
       //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
       res.redirect(`/mainlogin/:id/hotels`);
       })
   } catch(err){
       console.log(err);
   }
 })

 //===========================attraction Points===========================

app.get("/mainlogin/:id/attraction",(req,res)=>{
    let {id} = req.params;

    try{
        connection.query("select * from TouristSpots",(err,result) => {
           if(err) throw err;
           console.log(result);
           res.render("attraction/attraction.ejs",{data : result});
       })
    } catch(err){
       console.log(err);
    }
})

//-----------------FOR PLAN A TRIP------------------------//

app.get("/mainlogin/:id/planatrip",(req,res) => {
    
    let {id} = req.params;
    console.log(id);

    try{
        connection.query("Select * from user where id = ? ",id,(err1,result1) => {
           if(err1) throw err1;
           connection.query("Select * from pat where id = ? ",id,(err2,result2) => {
            if(err2) throw err2;

            // const combineData = {
            //     table1: result1,
            //     table2: result2
            //   };
            // console.log(result1);
            // console.log(result2);
  
             res.render("planatrip/planatrip.ejs",{table1: result1,table2: result2});
    //          if(id == undefined)
    //        {
    //         connection.query("select * from user where id = ? ",id,(err,result) => {
    //             if(err) throw err;
    //             console.log("first");
    //             res.render("planatrip/patform.ejs",{data : result});
    //         })
    //        }else {
    //         console.log("second");
    //         res.render("planatrip/patform.ejs",{data : result});
    //        }
    //        res.render("planatrip/planatrip.ejs",{data : result});
       })
    })

   } catch(err){
       console.log(err);
   }
 
})

app.get("/mainlogin/:id/planatrip/add",(req,res) => {
    let {id} = req.params;
   
    const query1 = "select * from user where id = ?";

    try{
        connection.query(query1,id,(err1,result1) => {
           if(err1) throw err1;
            // console.log(combineData);
           res.render("planatrip/patform.ejs",{data : result1});
       })
   } catch(err){
       console.log(err);
   }
})

app.get("/mainlogin/:id/map", (req, res) => {
    let { id } = req.params;
    res.render("map/estimate.ejs"); 
});
app.get("/mainlogin/:id/map/instation", (req, res) => {
    let { id } = req.params;
    res.render("map/instation.ejs"); 
});

app.get("/RideDetails/:id", (req, res) => {
    let { id } = req.params;
    const stationtype = req.query.stationType;
    const transportMode = req.query.transportMode;
    switch (stationtype) {
        case 'inStation':
            res.render("map/instation.ejs", { id: id });
            break;
        case 'outStation':
            switch(transportMode) {
                case 'ola':
                    res.render("map/instation.ejs", { id: id });
                    break;
                case  'trains':
                    res.render("map/train.ejs", { id: id });
                    break;
                default:
                    res.status(400).send('Invalid Option');
            }
            break;
        default:
            res.status(400).send('Invalid Option');
    }
});


// Endpoint to fetch train details based on source and destination
app.post("/mainlogin/mapdetails", (req, res) => {
    // const sourceStation = req.body.source;
    // const destinationStation = req.body.destination;

    let {source,destination} = req.body;

    console.log("%"+req.body.source+"%");

    // Fetch train details from the database based on source and destination
    // try{
    // connection.query("SELECT * FROM trains  where (source_station_name like (?) OR station_name like (?)) AND destination_station_name like (?)",["%"+req.body.source+"%","%"+req.body.source+"%","%"+req.body.destination+"%"], (error, results) => {
    //     if (error) {
    //         console.log(results);
    //         // console.error('Erro fetching trains from database:', error);
    //         // res.status(500).send('Error fetching trains from database');
    //     } else {
    //         // Send the results directly to the client without converting to JSON
    //         res.send(results);
    //     }
    // });

    try{
        connection.query("SELECT * FROM trains  where (source_station_name like (?) OR station_name like (?)) AND destination_station_name like (?)",["%"+req.body.source+"%","%"+req.body.source+"%","%"+req.body.destination+"%"], (error, results) => {
           if(error) throw error;
           console.log(results);
           res.render("map/trainmain.ejs",{data : results});
           // hotels =[id,result];
       //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
       })
   } catch(error){
       console.log(error);
   }
});



   
app.post("/mainlogin/:id/planatrip/add",(req,res) => {
    let {id} = req.params;
    console.log(id);
let {tripname,startdate,enddate,overallbudget,triptype,destination} = req.body;
let tripid  =Math.floor(Math.random() * (1000000));
let userid = id;
 
try{
    connection.query("insert into pat (tripid,id,tripname,startdate,enddate,overallbudget,triptype,destination) values (? , ? , ? , ? , ? , ? ,? , ?) ",[tripid,id,req.body.tripname,req.body.startdate,req.body.enddate,req.body.overallbudget,req.body.triptype,req.body.destination],(err,result) => {
       if(err) throw err;
       res.redirect(`/mainlogin/${id}/planatrip`);
   })
} catch(err){
   console.log(err);
}

})





app.get("/mainlogin/:id/finalresult",(req,res) => {
    let {id} = req.params;

    console.log(id);

    res.render("map/instation.ejs");
})


app.get("/mainlogin/:id/:tripid",(req,res) => {
    let {id,tripid} = req.params;

    try{
        connection.query("select * from trip_details where tripid = ?",tripid,(err5,result5) => {
           if(err5) throw err5;

           if(result5[0] == undefined)
           {
            connection.query("select * from user where id = ?",id,(err1,result1) => {
           if(err1) throw err1;
           connection.query("select * from pat where tripid = ?",tripid,(err2,result2) => {
            if(err2) throw err2;
            // console.log(result2[0].overallbudget);
            let hotel_budget = (result2[0].overallbudget*25)/100;
            let attraction_budget = (result2[0].overallbudget*10)/100;
            // console.log(hotel_budget);

           connection.query("select * from hotels where price <= ?",hotel_budget,(err3,result3) => {
            if(err3) throw err3;
            connection.query("select * from touristspots where Entrance_Fee_INR <= ? && City = ?",[attraction_budget,result2[0].destination],(err4,result4) => {
                if(err4) throw err4;
            // console.log(result3);
            
            // console.log(combineData);
           res.render("planatrip/patdetails.ejs",{data1 : result1 , data2 : result2, data3 : result3, data4: result4});
       })
    })
    })
})
           }else{
           res.render("map/instation.ejs",{data : result5})
           }
           })
            } catch(err){
       console.log(err);
   }
})

app.post("/mainlogin/:id/:tripid/pat",(req,res) => {
    let {id,tripid} = req.params;

    console.log(id);
    console.log(tripid);
    //  let tourist = {check,tour} = req.body;
    //  console.log(check);
    //  console.log(tour);
    // for(let i=0;i<50;i++){
    //     console.log(tourist);
    // }
   let tourist = [];
    
    for (let i = 0; i <= 325; i++) {
        if(req.body['tour' + i] != undefined)
        {
        tourist.push([req.body['tour' + i]]);
        }
    }
    console.log(tourist);
    console.log(tourist.length);
     
    
     let check = req.body.checks;
    //  let tourist = [];
    //  for(let i=0;i<=5;i++)
    //  {
    //     tourist = [req.body.tour];
    //  }
    //  console.log(check);
    //  console.log(tourist);
    //  console.log(tour.length);

     try{
        connection.query("select * from hotels where title = ?",check,(err1,result1) => {
            if(err1) throw err1;
            console.log(result1[0].title);
            

         

           for(let i=0;i<tourist.length;i++){
        //    connection.query("select * from pat where id= ?",id,(err3,result3) => {
        //     if(err3) throw err3;
            connection.query("select * from touristspots where Name = ?",[tourist[i]],(err3,result3) => {
                if(err3) throw err3;
            connection.query("insert into trip_details (id,tripid,hotel_name,hotel_price,hotel_image,hotel_location,attraction_name,attraction_price,attraction_image,timetovisit) values (?, ? ,? , ? , ? ,? ,? ,? ,? ,?)",[id,tripid,result1[0].title,result1[0].Price,result1[0].image,result1[0].Location,result3[0].Name,result3[0].Entrance_Fee_INR,result3[0].Image_URL,result3[0].Time_Needed_Hrs],(err4,result4) => {
                if(err4) throw err4;
                
          
        // console.log(result4);
       })
    // })
})
}
res.redirect(`/mainlogin/${id}/${tripid}/fin`);
    })
    } catch(err){
       console.log(err);
    }
})

app.get("/mainlogin/:id/:tripid/fin",(req,res) => {
   let {id,tripid} = req.params;

    try{
    connection.query("select * from trip_details where tripid = ?",tripid,(err4,result4) => {
        if(err4) throw err4;
    res.render("map/instation.ejs",{data : result4})
})
    } catch(err){
       console.log(err);
    }
})


app.listen(7000);
