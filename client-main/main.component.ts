import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 sub:Subscription = new Subscription

usersData : User[] = []
tofilter : User[] = [] 
fromnotify :string = "" 
toadduser : boolean = false 
namei : string = "Guy Kabilio"
namefield : string = "" 
emailfield : string = "" 


  constructor(private http : HttpClient, private rout : Router) { }
    
   
   
  adduser()
  {   
     let last  = this.usersData.slice(-1)
    let id =  last[0].ID +1
    let obj = {ID:id,Name:this.namefield , Email : this.emailfield,
      Street : "", City : "", Zipcode : 0 , 
      Tasks:[{ID: 0 , Title:"" , Completed:Boolean}]}
  

     this.sub = this.http.post("http://localhost:8000/api/users", obj)
     .subscribe((data:any)=> {
       if(data==="Created!")
       {  
         this.toadduser=false
         //this.clear() 
         window.location.reload();
       }
     })
  } 

 clear()
 {
  this.toadduser=false
   this.namefield="" 
   this.emailfield = ""
 }
 
  search(value :string)
  { 
    
     this.usersData = this.tofilter.filter(x => {
       return x.Name.includes(value)||x.Email.includes(value)
      })
  } 

  delete(obj :any)
  { 
     this.usersData.filter( x => x._id == obj._id)  
     this.usersData.splice(this.usersData.indexOf(obj),1)
  } 

  


  ngOnInit(): void { 
    this.http.get("http://localhost:8000/api/users")
    .subscribe((data:any)=>
    {
      this.usersData = data 
      this.tofilter = data
      
      
      
    })

  }

  ngOnDestroy()
  {
    this.sub.unsubscribe()
  }
}
