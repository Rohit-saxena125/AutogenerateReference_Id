const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
// auto generated referncenumber
const pretext = "Hoot";
const posttext = "Dec";
const startNum = 1000;
var NextNum = startNum;
// take input from user userid ,template ,fieldname
app.get("/Submit", async(req, res) => {
  try{
  var userid = req.body.userid;
  var template = req.body.template;
  var fieldname = req.body.fieldname;
  const jsondata = JSON.parse(fs.readFileSync("test.json"));
  var useridExist = false;
  var templateExist = false;
  var fieldnameExist = false;
  if(jsondata.hasOwnProperty(userid)){
    useridExist = true;
  }
  if(useridExist){
    if(jsondata[userid].hasOwnProperty(template)){
      templateExist = true;
    }
  }
  if(templateExist){
    if(jsondata[userid][template].hasOwnProperty(fieldname)){
      fieldnameExist = true;
    }
  }
  if(fieldnameExist){
    res.send(pretext+NextNum+posttext);
  }
  else{
    res.send("fieldname not exist");
  }
}
catch(err){
  res.status.send(err);

}
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});