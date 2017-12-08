import { Injectable }     from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User } from '../model/index';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class HomeService{
  constructor(private http: Http){

  }
 
    getUserEndpoints(name:string) : Observable<any>{
        var url = "https://7mjn5iloxc.execute-api.us-west-2.amazonaws.com/DEV?uname="+name;
        console.log(url);
        return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
      }

      saveNewUrl(url:string,shortName:string,name:string): Observable<any>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {"uname": name,"shortname": shortName,"url": url};
        return this.http
          .post("https://7mjn5iloxc.execute-api.us-west-2.amazonaws.com/DEV", body, { headers: headers })
          .map(response => response.json())
          .catch(this.handleError);;
      }
      private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }
    
      private handleError (error: any) {
        let errMsg = (error._body) ? error._body :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      }


}