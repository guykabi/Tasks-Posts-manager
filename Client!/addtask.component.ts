import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  sub: Subscription = new Subscription

  constructor(private http :HttpClient) { }
  
  @Input()
  createtask : User = { _id: "",ID: 0 , Name : "", Email : "" , Street : "" , City : "", 
  Zipcode : 0 , Tasks : [{ID : 0, Title : "" , Completed : true, _id: ""}], 
                 Posts : [{ID: 0 , Title : "" , Body : ""}]}
 
   @Output() notify : EventEmitter<boolean> = new EventEmitter<boolean>()
     
   tilt : string = ""
   tocancel : boolean = true
   cancel()
   { 
     this.tilt =""
     this.notify.emit(this.tocancel)
   } 

   addtask()
   {  
    let arrtask = []    
    let arrpost =[] 
    let taski2 = {ID:0,Title:"",Completed :false}
    for(let i =0; i<this.createtask.Tasks.length;i++)
    {
      let taski = {ID:0,Title:"",Completed :false}
      taski.ID = this.createtask.Tasks[i].ID
      taski.Title =this.createtask.Tasks[i].Title
      taski.Completed = this.createtask.Tasks[i].Completed  
      arrtask.push(taski)
    }  
    //The task I want to add
      taski2.ID = this.createtask.Tasks.length+1
      taski2.Title = this.tilt 
      taski2.Completed = false 
      arrtask.push(taski2)

    for(let i =0; i<this.createtask.Posts.length;i++)
    {
      let posti = {ID:0,Title:"",Body :""}
      posti.ID = this.createtask.Posts[i].ID
      posti.Title =this.createtask.Posts[i].Title
      posti.Body = this.createtask.Posts[i].Body  
      arrpost.push(posti)
    }

     let obj = {Name: this.createtask.Name, Email: this.createtask.Email, 
                Street : this.createtask.Street, City : this.createtask.City, Zipcode : this.createtask.Zipcode,
                Tasks: arrtask, Posts: arrpost } 
   
   this.sub= this.http.put("http://localhost:8000/api/users/"+this.createtask._id,obj )
   .subscribe((data:any)=>{
      this.cancel()
   })
   }

  ngOnInit(): void {
  } 
  ngOnDestroy()
  {
    this.sub.unsubscribe()
  }

}
