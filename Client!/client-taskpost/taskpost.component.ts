import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-taskpost',
  templateUrl: './taskpost.component.html',
  styleUrls: ['./taskpost.component.css']
})
export class TaskpostComponent implements OnInit { 
 
 sub : Subscription = new Subscription
 sub2 : Subscription = new Subscription

  uData : User = { _id: "",ID: 0 , Name : "", Email : "" , Street : "" , City : "", 
  Zipcode : 0 , Tasks : [{ID : 0, Title : "" , Completed : true, _id : ""}], 
                 Posts : [{ID: 0 , Title : "" , Body : ""}]} 
 
  isCompleted : boolean = false 
  userid : any   
  
  @Input()
  whichdiv : boolean = true
  whichdiv2: boolean = true
 
@Output() notify3 : EventEmitter<string> = new EventEmitter<string>()
@Output() notify5 : EventEmitter<string> = new EventEmitter<string>()


  constructor(private http : HttpClient,private rout : Router , private ar : ActivatedRoute) { }  

//open window of add task
  toaddtask()
  {
    this.whichdiv = !this.whichdiv 
  } 
  
  //open window of add post
  toaddpost()
  {
    this.whichdiv2 = !this.whichdiv2
    
  }  
 //back after adding post
  torefresh(val : any)
  {
    this.whichdiv2 = !this.whichdiv2
    this.ngOnInit()
  } 
  torefresh2(val : any)
  {
    this.whichdiv = !this.whichdiv
    this.notify5.emit(val)
    this.ngOnInit()
  }


  marktask( fulltask : any)
  { 

    let arrtask = []    
    let arrpost =[] 
    let taski2 = {ID:0,Title:"",Completed :false}
    for(let i =0; i<this.uData.Tasks.length;i++)
    {
      let taski = {ID:0,Title:"",Completed :false}
      taski.ID = this.uData.Tasks[i].ID
      taski.Title =this.uData.Tasks[i].Title
      taski.Completed = this.uData.Tasks[i].Completed  
      arrtask.push(taski)
    }  
    //The task I want to make true
   let index = this.uData.Tasks.indexOf(fulltask)
      taski2.ID = this.uData.Tasks.length+1
      taski2.Title = fulltask.Title
      taski2.Completed = true 
      arrtask[index]=taski2

    for(let i =0; i<this.uData.Posts.length;i++)
    {
      let posti = {ID:0,Title:"",Body :""}
      posti.ID = this.uData.Posts[i].ID
      posti.Title =this.uData.Posts[i].Title
      posti.Body = this.uData.Posts[i].Body  
      arrpost.push(posti)
    }

    let obj = {Name: this.uData.Name, Email: this.uData.Email, 
      Street : this.uData.Street, City : this.uData.City, Zipcode : this.uData.Zipcode,
      Tasks: arrtask, Posts: arrpost } 
   this.sub =  this.http.put("http://localhost:8000/api/users/"+this.uData._id,obj)
    .subscribe((data:any)=>{
      this.ngOnInit();  
      //Emit to chnage border color of user
      this.notify3.emit(this.uData.Name)
      
        
    })
  }


  ngOnInit(): void { 
    let count = 0
    for(let i =0; i<this.uData.Tasks.length;i++)
    {
       if(this.uData.Tasks[i].Completed === false)
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

      this.userid = sessionStorage.getItem('id')
     this.sub2 = this.http.get("http://localhost:8000/api/users/"+this.userid)
      .subscribe((res:any)=> this.uData = res)
  } 

  ngOnDestroy()
    {
      this.sub.unsubscribe()
    } 
    ngOnDestroy2()
    {
    this.userid.unsubscribe()
    }
 

}
