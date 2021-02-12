import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

const dbUrl = 'https://shoppinglist-4ae47-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
@Injectable({providedIn: 'root'})
export class PostsService{
    error = new Subject<string>();
    constructor(private http: HttpClient){}

    createAndStorePosts(title:string, content:string){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('custom','key');
        const postData :Post = {title: title, content:content};
        this.http.post<{name:string}>(
            dbUrl, 
            postData, 
            {
                headers: new HttpHeaders({"Custom-Header": 'Hello'}),
                params: searchParams,
                observe: 'response'
        }).subscribe(
      responseData => {
        console.log(responseData);
      }
     ), error => {
         this.error.next(error.message);
     }
    }
    fetchPosts(){
        return this.http.get<{[key: string]: Post}>(dbUrl)
        .pipe(map(responseData => { //convert POJO to array of obejct
          const postsArray:Post[] = [];
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key))
            postsArray.push({...responseData[key], id: key})
          }
          return postsArray;
        }
        ),catchError(errorRes => {
            //send to analytics server or own stuff
            return throwError(errorRes);
        }));
    }
    deletePosts() {
       return this.http.delete(dbUrl, {
         observe: 'events',
         responseType: 'text'
        }).pipe(tap(event => {
         console.log(event);
         if(event.type === HttpEventType.Sent)
         console.log("request sent"); //mostly used to update ui
         if(event.type === HttpEventType.Response)
         console.log(event.body);
       }));
    }
}