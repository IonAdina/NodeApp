// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Read All
function readJSONFile(){
    return JSON.parse(fs.readFileSync('db.json'))['galaxy']
}

// Writing function from db.json file
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ galaxy: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Create
app.post("/galaxy", (req, res) => {
  const GList = readJSONFile();
  // Fill in your code here
  const newG = req.body;
  newG.id = GList[GList.length-1].id + 1;
  GList.push(newG);
  writeJSONFile(GList);
  res.status(200).send(newG);
  console.log(newG)
  console.log("am trimis")
});

app.get("/galaxy", (req, res) => {
    const gList = readJSONFile();
    // Fill in your code here 
    if(gList != undefined && gList.length != 0) {
      res.status(200).send(gList);
    } else {
      res.status(204).send('No galaxy found!');
    }
  });




// Read One
app.get("/galaxy/:id", (req, res) => {
  const GList = readJSONFile();
  // Fill in your code here
  const id = req.params.id;
  let foundG = null;
  GList.forEach(g => {
    if (g.id === id) {
        foundG = g;
    }
  })
  if (foundG === null) {
    res.status(204).send('No Galaxy found!');
  } else {
    res.status(200).send(foundG);
  }
});


// Update
app.put("/galaxy/:id", (req, res) => {
  const gList = readJSONFile();
  // Fill in your code here
  
  const id = req.params.id;
  const update = req.body.name
  let gToUpdate = null;
  for (let i = 0; i < gList.length; i++) {
    if (gList[i].id === Number(id)) {
        if (update) {
            gList[i].name = update;
        }

       

        gToUpdate = gList[i];
        break;
    }
  }
  writeJSONFile(gList);
  if (gToUpdate === null) {
    res.status(204).send('No dog found!')
  } else {
    res.status(200).send(gToUpdate);
  }
});
 
// Delete
app.delete("/galaxy/:id", (req, res) => {
  const gList = readJSONFile();
  // Fill in your code here
  
  const id = req.params.id;
  console.log(id)

  let check = false;
  for(let i = 0; i < gList.length; i++) {
    if(gList[i].id === Number(id)) {
        check = true;
        gList.splice(i, 1);
        break;
    }
  }
  
  writeJSONFile(gList);
  if (check === true) {
    res.status(200).send('Galaxy deleted!');
  } else {
    res.status(204).send('No galaxy found!');
  }
});


// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);



//////////////////
app.use(express.static("public"))