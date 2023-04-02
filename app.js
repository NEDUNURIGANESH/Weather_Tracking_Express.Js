const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const https=require('https');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");    
});
app.post("/",(req,res)=>{ 
    const query=req.body.city;
    const appKey="a4c09b3b47ac209491a111356ab9f1c7";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/forecast?q=" + query +"&appid=" + appKey +"&units=" +unit;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
        
            const weatherData=JSON.parse(data);
            const temp=weatherData.list[0].main.temp;
            const weatherDescription=weatherData.list[0].weather[0].description;
            const icon=weatherData.list[0].weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            //we can write many res.write() but there should be only res.send() otherwise server will throw error
            res.write("<h1>current temperature in "+ query+" is "+temp+" degree celsius</h1>");
            res.write("<h2>weather condition is "+weatherDescription+"</h2>")
            res.write("<img src="+ imageURL +">");
            //res.write("<h1>current temperature in "+ query+ " is "+temp+" degree celsius</h1>");
            res.send();
        });
    });
});
    app.listen(3000);
});
