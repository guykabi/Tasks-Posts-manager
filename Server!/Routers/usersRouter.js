const usersBL = require('../Models/usersBL')  
const express = require('express'); 
const { route } = require('express/lib/application');
const usersModel = require('../Models/usersModel');

const router = express.Router(); 

router.route('/')
.get(async function(req,resp)
{
  let data = await usersBL.getAllusers()
   return resp.json(data)
})  

router.route('/:id')
.get(async function(req,resp)
{
  let id = req.params.id 
  let data = await usersBL.getUser(id)
  return resp.json(data)
}) 

router.route('/')
.post(async function(req,resp)
{
  let obj = req.body
  let data = await usersBL.addUser(obj)
  return resp.json(data)
})  

router.route('/:id')
.put(async function(req,resp)
{
    let id = req.params.id 
    let body = req.body 
    let data = await usersBL.updateUser(id,body) 
    return resp.json(data)
}) 

router.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id 
    let data = await usersBL.deleteUser(id) 
    return resp.json(data)
})

module.exports = router

