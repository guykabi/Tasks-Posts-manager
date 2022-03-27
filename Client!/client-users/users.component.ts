import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';

import { User } from '../user'; 


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sub: Subscription = new Subscription
  sub2: Subscription = new Subscription

  @Input()
  userData : User = { _id: "",ID: 0 , Name : "", Email : "" , Street : "" , City : "", 
     Zipcode : 0 , Tasks : [{ID : 0, Title : "" , Completed : true, _id:""}], 
                    Posts : [{ID: 0 , Title : "" , Body : ""}]} 
 
  @Output()
  notify : EventEmitter<User> = new EventEmitter<User>() 

  
  /* Frame color*/  
   isCompleted : boolean = true 

  /*Other data*/
   openclose : boolean = false  

  /*open side div & change color to orange*/ 
   taskposti : boolean = false            

  constructor(private http : HttpClient,private rout : Router) { } 
 

  updateuser()
  {  
    let arrtask = []    
    let arrpost =[] 
    for(let i =0; i<this.userData.Tasks.length;i++)
    {
      let taski = {ID:0,Title:"",Completed :false}
      taski.ID = this.userData.Tasks[i].ID
      taski.Title =this.userData.Tasks[i].Title
      taski.Completed = this.userData.Tasks[i].Completed  
      arrtask.push(taski)
    } 
    for(let i =0; i<this.userData.Posts.length;i++)
    {
      let posti = {ID:0,Title:"",Body :""}
      posti.ID = this.userData.Posts[i].ID
      posti.Title =this.userData.Posts[i].Title
      posti.Body = this.userData.Posts[i].Body  
      arrpost.push(posti)
    }
    let obj = {ID:this.userData.ID,Name:this.userData.Name, Email:this.userData.Email, 
    Street:this.userData.Street, City:this.userData.City, Zipcode:this.userData.Zipcode, 
    Tasks:arrtask, Posts:arrpost
      } 
     this.sub =  this.http.put("http://localhost:8000/api/users/"+this.userData._id , obj)
      .subscribe((data:any)=>{
         if(data ==="Updated")
         {
           this.rout.navigate(["/"])
         }
      })
  } 

  delete()
  {
   this.sub2=this.http.delete("http://localhost:8000/api/users/"+this.userData._id)
    .subscribe((data:any)=>{
      if(data==="Deleted")
      { 
        
         this.notify.emit(this.userData)
      }
    })
  } 
 
  //send the user id to session storage
  tosession()
  {
    sessionStorage.setItem('id', this.userData._id);
  } 
 

  refresh(noti : any)
  { 
   this.http.get("http://localhost:8000/api/users/"+this.userData._id)
   .subscribe((data:any)=>{
     this.userData= data 
     let count = 0
    for(let i =0; i<this.userData.Tasks.length;i++)
    {
       if(this.userData.Tasks[i].Completed === false)
       { 
           count +=1
       }   
    } 
    if(count>0)
    {
      this.isCompleted = false
    } 
    else 
    {
          this.isCompleted = true
    }   
    
   })
  }
  

  ngOnInit(): void {  
    let count = 0
    for(let i =0; i<this.userData.Tasks.length;i++)
    {
       if(this.userData.Tasks[i].Completed === false)
       { 
           count +=1
       }   
    } 
    if(count>0)
    {
      this.isCompleted = false
    } 
    else 
    {
          this.isCompleted = true
    }   
    
    
    
  }
 
  ngOnDestroy()
  {
    this.sub.unsubscribe()
  } 
  ngOnDestroy2()
  {
    this.sub2.unsubscribe()
  }
}
