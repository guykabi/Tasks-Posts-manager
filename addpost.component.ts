import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
sub: Subscription = new Subscription
  constructor(private http : HttpClient) { }
  
  @Input()
  createpost : User = { _id: "",ID: 0 , Name : "", Email : "" , Street : "" , City : "", 
  Zipcode : 0 , Tasks : [{ID : 0, Title : "" , Completed : true, _id: ""}], 
                 Posts : [{ID: 0 , Title : "" , Body : ""}]}

 @Output() notify2 : EventEmitter<boolean> = new EventEmitter<boolean>() 
  

 mustbefull : string = ""
 tocancel : boolean = true 
 tilt : string = ""
 body : string = ""
   cancel()
   { 
     this.tilt ="" 
     this.body = ""
     this.notify2.emit(this.tocancel)
   } 

   addpost()
   {   
     
    let arrtask = []    
    let arrpost =[] 
    let posti2 = {ID:0,Title:"",Body :""}
    for(let i =0; i<this.createpost.Tasks.length;i++)
    {
      let taski = {ID:0,Title:"",Completed :false}
      taski.ID = this.createpost.Tasks[i].ID
      taski.Title =this.createpost.Tasks[i].Title
      taski.Completed = this.createpost.Tasks[i].Completed  
      arrtask.push(taski)
    }  
    
    for(let i =0; i<this.createpost.Posts.length;i++)
    {
      let posti = {ID:0,Title:"",Body :""}
      posti.ID = this.createpost.Posts[i].ID
      posti.Title =this.createpost.Posts[i].Title
      posti.Body = this.createpost.Posts[i].Body  
      arrpost.push(posti)
    }  
    //insert the post i want to add
    posti2.ID = this.createpost.Posts.length+1 
    posti2.Title = this.tilt 
    posti2.Body = this.body
    arrpost.push(posti2)

     let obj = {Name: this.createpost.Name, Email: this.createpost.Email, 
                 Street : this.createpost.Street, City : this.createpost.City, Zipcode : this.createpost.Zipcode,
                 Tasks: arrtask, Posts: arrpost } 
   
     this.sub= this.http.put("http://localhost:8000/api/users/"+this.createpost._id,obj )
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
