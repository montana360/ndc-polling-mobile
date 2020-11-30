import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router} from "@angular/router";
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  status: any;
  isLoading = false;

  loginForm: FormGroup;

  // login Data
  loginData = {
    username:"",
    password: "",
    grant_type: "password",
    client_id: "2",
    client_secret:"94onv0rbdIAZDXQO9I5HaBtBpBlLzwEedYixBD5T",
    scope: "*",
  };

  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email:[
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password:[
        null,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    })
   }

  ngOnInit() {}
 
  setCredentials(){
    (this.loginData.username = this.loginForm.controls["email"].value),
    (this.loginData.password = this.loginForm.controls["password"].value);
  }

  // function for logging in
  signIn() {
    this.isLoading = true;
    this.setCredentials();
    console.log(this.loginData);
    this.auth.authenticate(this.loginData).subscribe(
      (response) => {
        // console.log(response);
        if (response !== null || response !== undefined) {
          localStorage.setItem("token", response["access_token"]);
          this.checkAccessLevel(this.loginData);
        }
      },
      (error) => {
        if (error.status === 500) {
          this.isLoading = false;
          console.log(error);
          this.alert.info("Oops something went wrong, please try again later");
        } else if (error.status === 0) {
          this.isLoading = false;
          console.log(error);
          this.alert.warning("Network Error. Please check your connectivity.");
        } else if (error.status === 401) {
          this.isLoading = false;
          console.log(error);
          this.alert.warning(
            "Username or Password Incorrect. Please check and enter again."
          );
        } else {
          this.isLoading = false;
          this.alert.info("Wrong credentials");
          console.log(error);
        }
      }
    );
  }

  checkAccessLevel(data) {
    this.auth.store("access_level", data).subscribe(
      (response) => {
        if (response["user"]["status"] !== "Active") {
          localStorage.clear();
          this.isLoading = false;
          this.alert.warning(
            "Account is " +
              response["user"]["status"] +
              ", please contact Admin"
          );
          this.router.navigate(["/auth/signin-v2/"]);
          return false;
        }

        const access_level = response["user"]["role"];
        localStorage.setItem("user", JSON.stringify(response["user"]));
        localStorage.setItem("userID", response["user"]["id"]);
        localStorage.setItem("username", response["user"]["first_name"]);
        localStorage.setItem("userType", response["user"]["role"]);

        if (access_level === "District Officer") {
          this.alert.success("Welcome " + localStorage.getItem("username"));
          this.router.navigate(["/district-officers/"]);
          localStorage.setItem("access_level", "District Officer");
        } else if (access_level === "Polling Agent") {
          this.alert.success("Welcome " + localStorage.getItem("username"));
          this.router.navigate(["/polling-agent/"]);
          localStorage.setItem("access_level", "Polling Agent");
          // this.getPermissions(response["user"]["id"]);
        } else {
          localStorage.clear();
          this.alert.info("Admin Cannot Access this..");
          this.router.navigate(["/welcome/"]);
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.alert.error("Signing In unsuccessful, please try again later.");
      }
    );
  }

  getPermissions(id) {
    this.auth.show("permissions", id).subscribe(
      (response) => {
        if (response !== null || response !== undefined) {
          if (response["data"][0]["cash_report"] == 1) {
            localStorage.setItem("cash_report", "true");
          }

          if (response["data"][0]["crm"] == 1) {
            localStorage.setItem("crm", "true");
          }

          if (response["data"][0]["inventory"] == 1) {
            localStorage.setItem("inventory", "true");
          }

          if (response["data"][0]["reverse_transaction"] == 1) {
            localStorage.setItem("reverse_transaction", "true");
          }

          if (response["data"][0]["sales_report"] == 1) {
            localStorage.setItem("sales_report", "true");
          }

          if (response["data"][0]["setup"] == 1) {
            localStorage.setItem("setup", "true");
          }

          if (response["data"][0]["sm_master_report"] == 1) {
            localStorage.setItem("sm_master_report", "true");
          }

          if (response["data"][0]["stock_report"] == 1) {
            localStorage.setItem("stock_report", "true");
          }

          if (response["data"][0]["transaction_menu"] == 1) {
            localStorage.setItem("transaction_menu", "true");
          }

          if (response["data"][0]["work_order"] == 1) {
            localStorage.setItem("work_order", "true");
          }
        }

        this.isLoading = false;

        this.router.navigate(["/dashboard/default"]);
        this.alert.success("Welcome " + localStorage.getItem("username"));
      },
      (error) => {
        console.log(error);
        this.alert.error("Signing In unsuccessful, please try again later.");
        return false;
      }
    );
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
