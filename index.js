const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000;
require("dotenv").config()




// user = clean_co=
// password = FskL5c8lhKPnWvr9

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5xct9xp.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const servicesCollection = client.db("clean_co").collection("service");


      //* Get All Services 
      app.get('/service', async(req, res)=>{
        const services = await servicesCollection.find({}).toArray();
        res.send(services)
      })

      //*----------- Post Services

      
      //* Post Services
      app.post("/service", async(req, res)=>{
        try {
        const service = req.body;
        const result = await servicesCollection.insertOne(service)
        res.send({status: true, result: result} )
        } 
        catch (error) {
          res.send({status:false, error:error})
        }
      })

      //*----------- Update Product

      app.put("/service/:id", async(req, res)=>{
        try {
        const {id} = req.params;
        const data = req.body;
        const filter = {_id: ObjectId(id)}
        const documents = {$set: data}
        const option = {upsert: true}

        const result = await servicesCollection.updateOne(filter, documents, option)
        
        res.send({status: true, result: result} )
        } 
        catch (error) {
          res.send({status:false, error:error})
        }
      })


      //*----------- Delete Post

      app.delete("/service/:id", async(req, res)=>{
        try {
        const id = req.params;
        const query = {_id: ObjectId(id)}
        const result = await servicesCollection.deleteOne(query)
        res.send({status: true, result: result} )
        } 
        catch (error) {
          res.send({status:false, error:error})
        }
      })

     


      /*


      //* User Data
      app.get("/dummey-user2", async (req, res)=>{
        const data = req.body;
       
        res.json(data)
      })

      */
      //* Use Query
      /*
      app.get("/dummey-user", async (req, res)=>{
        const name = req.query.name;
        const age = req.query.age;
        const user = {
          name: name,
          age: age
        }        
        res.json(user)
      })

      */

      /*
      //* Use Params 
      app.get("/user/:id", async (req, res)=>{
        const id = req.params;
        res.json(id)
      })

    */
    } finally {
      // await client.close();
    }
  }
  app.get("/", async(req, res)=>{
    res.send("Server running")
  })
  
  run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`Server running with ${port}`);
}) 