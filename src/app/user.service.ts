  import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from "moment";

 @Injectable({
  providedIn: 'root'
 })
  export class UserService {

  // http options used for making API calls
  private httpOptions: any;
  public name: string;

  // the token expiration date
  public expires_in: any;

  // the username of the logged in user
  public scope: string;

  // token from google/fb after authenticating against them.
  public refresh_token: string;

  // authorization token generated by DRF.
  public token_type: string;
  public access_token: any;
  public registration_pending: string;
  public user_id:any;
  public username:string;

  // error messages received from the login attempt
  public errors: any = [];
  constructor(private http: HttpClient) {
  }

  // Send google/fb token to django and get back a django token,
  // that can then be sent in each request.
  public login(httpRequestData) {
     console.log("request headers: " + this.httpOptions)

     this.http.post("userauth", httpRequestData, this.httpOptions).subscribe(
       authResult  => {
         console.log(authResult);
         this.updateData(authResult);
       },
       err => {
         this.errors = err['error'];
       }
     );
  }

  public getAccessToken() {
    return localStorage.getItem('access_token')
  }

  public getUserId() {
    return localStorage.getItem('user_id')
  }


  public setLocalStorageUserdata(userData, socialPlatform) {
    console.log(userData)
    console.log(JSON.stringify(userData))
    if (socialPlatform  == "google") {
      this.username = userData.name
      localStorage.setItem("username", userData.name)
      localStorage.setItem("id", userData.id)
      localStorage.setItem("image", userData.image)
    }

  }

  public setLocalStorageSessionData() {
    localStorage.setItem('access_token', this.access_token);
    localStorage.setItem('refresh_token', this.refresh_token);
  }

  public isLoggedIn() {
    if (localStorage.getItem("access_token") != undefined) {
       console.log("access token found.")
       return true;
    } else {
       console.log("access token NOT found.")
       return false;
    }
  }

  public registrationPending() {
      return true;
  }

  public getUsername() {
    if (this.isLoggedIn()) {
      const username = localStorage.getItem("username");
      if ( username === null ) {
        return "anonymous";
      } else {
        return username;
      }
    } else {
       return "anonymous";
    }
  }

  //
  public refreshToken() {

  }

  private updateData(authResult) {
    this.errors = [];
    // decode the token to read various details.
    const authResultJson = JSON.parse(JSON.stringify(authResult))
    const converted_token = authResultJson.converted_token;

    console.log("converted_token: ");
    console.log(converted_token);

    this.access_token = converted_token.access_token;

    this.token_type = converted_token.token_type;
    this.scope = converted_token.scope;
    this.refresh_token = converted_token.refresh_token;
    this.expires_in = new Date(new Date() + converted_token.expires_in);

    this.registration_pending = authResultJson.registration_pending;
    this.user_id = authResultJson.user_id;

    this.setLocalStorageSessionData()
  }

}
