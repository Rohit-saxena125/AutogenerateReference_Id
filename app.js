const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pretext = "Hoot";
const posttext = "Dec";
const startNum = 1000;
var NextNum = startNum;
app.post("/", (req, res) => {
  try{
    var user_Id = req.body.userid;
    var Template_Id = req.body.template;
    var fieldname = req.body.fieldName;
    console.log(user_Id, Template_Id, fieldname);
    // check if user_Id is present in the json file or not
    var jsonData = JSON.parse(fs.readFileSync("./test.json"));
    var userId_present = false;
    var template_Id_present = false;
    var fieldName_present = false;
    var res_value = "";
    // check if userId is present in the json file or not
    if(jsonData.userid==user_Id){
      userId_present = true;
      if(jsonData.template==Template_Id){
        template_Id_present = true;
        if(jsonData.fieldName==fieldname){
          fieldName_present = true;
          NextNum++;
          res_value =pretext+NextNum+posttext ;
        }
      }
    }
    if (userId_present == true) {
      if (template_Id_present == true) {
        if (fieldName_present == true) {
          res.send(res_value);
        } else {
          res.send("fieldname not present");
        }
      } else {
        res.send("template_id not present");
      }
    } else {
      res.send("user_id not present");
    }
}
catch(err){
  res.status(500).send('kuch to error hai');
}
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});