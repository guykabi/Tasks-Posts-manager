const usersModel = require('./usersModel') 


const getAllusers = function()
{
    return new Promise((resolve,reject) =>
    {
        usersModel.find({}, function(err, data)
        {
            if(err)
            {
               reject(err)
            }
            else
            {
                 resolve(data);
            }
        })
    })
}   

const getUser = (id) =>
{
  return new Promise((resolve,reject)=>
  {
      usersModel.findById(id, function(err,data)
      {
        if(err)
        {
           reject(err)
        }
        else
        {
             resolve(data);
        }
      })
  })
}  

const getUserByName = (name) => 
{
    return new Promise((resolve,reject)=>
    {
        usersModel.find({Name:{ $regex : name }} , function(err,data)
        {
            if(err)
            {
                reject(err)
            } 
            else 
            {
                resolve(data)
            }
        })
    })
}


const addUser = (obj) => 
{ 
    
    return new Promise((resolve, reject)=>
    {  
        //Make costume array to insert the tasks and the posts
              let arrtask = []    
              let arrpost =[] 
              if(obj.Tasks!=null&&obj.Posts!=null)
              {
              for( let i=0; i<obj.Tasks.length; i++)
              { 
                let task = {}
                 task.ID = obj.Tasks[i].ID
                 task.Title = obj.Tasks[i].Title
                 task.Completed = obj.Tasks[i].Completed  
                 arrtask.push(task)
              }
              for( let i=0; i<obj.Posts.length; i++)
              { 
                let post = {}
                 post.ID = obj.Posts[i].ID
                 post.Title = obj.Posts[i].Title
                 post.Body = obj.Posts[i].Body 
                 arrpost.push(post)
              } 
            }
    let user = new usersModel({
            ID: obj.ID, 
            Name : obj.Name , 
            Email : obj.Email ,
            Street : obj.Street , 
            City : obj.City , 
            Zipcode : obj.Zipcode,  
            Tasks : arrtask,
            Posts : arrpost
        
        }) 
    
        user.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created!');
            } 
        })
    })
} 


const updateUser = (id,obj) =>
 {
     return new Promise((resolve,reject)=>
     {  
        
           let arrtask = []    
           let arrpost =[]
        for( let i=0; i<obj.Tasks.length; i++)
        { 
           let task = {}
           task.ID = obj.Tasks[i].ID
           task.Title = obj.Tasks[i].Title
           task.Completed = obj.Tasks[i].Completed  
           arrtask.push(task)
        }
        for( let i=0; i<obj.Posts.length; i++)
        { 
          let post = {}
           post.ID = obj.Posts[i].ID
           post.Title = obj.Posts[i].Title
           post.Body = obj.Posts[i].Body 
           arrpost.push(post)
        }
         usersModel.findByIdAndUpdate(id, {
            Name : obj.Name , 
            Email : obj.Email ,
            Street : obj.Street , 
            City : obj.City , 
            Zipcode : obj.Zipcode,  
            Tasks : arrtask,
            Posts : arrpost
         
         }, function(err){
             if(err)
             {
                 reject("Oppsi")
             } 
             else 
             {
                 resolve("Updated")
             }
         }) 
        
        
     }) 
    
 } 


 const deleteUser = (id) =>
 {
     return new Promise((resolve, reject)=>
     {
         usersModel.findByIdAndDelete(id, function(err){
             if(err)
             {
                 reject(err)
             } 
             else 
             {
                 resolve("Deleted")
             }
         })
     })
 }

module.exports = {getAllusers,getUser,getUserByName, addUser, updateUser,deleteUser}