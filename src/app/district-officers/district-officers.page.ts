import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-district-officers',
  templateUrl: './district-officers.page.html',
  styleUrls: ['./district-officers.page.scss'],
})
export class DistrictOfficersPage implements OnInit {
  isLoading = false;
  selectedSegment = 'president';
  Parliament: any;
  President: any;

  constructor(
    private auth: AuthenticationService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController

  ) { }

  ngOnInit() {
    this.gettotalVotsp();
    this.gettotalPrvotes();
  }
  gettotalPrvotes() {
    this.isLoading = true;
    this.auth.get('total-votes').subscribe(
      (response) => {
        this.President = response['data'];
        console.log('Pres Votes', this.President);
        this.isLoading = false;
        // this.alert.success(response['message']);
        // this.getUsers();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  gettotalVotsp() {
    this.isLoading = true;
    this.auth.get('total-votes-parliamentary').subscribe(
      (response) => {
        this.Parliament = response['data'];
        console.log('Pres Votes', this.Parliament);
        this.isLoading = false;
        // this.alert.success(response['message']);
        // this.getUsers();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value;
  }
  logout() {
    localStorage.clear();
    // console.log('Logout success');
    this.router.navigate(['/welcome/']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'logout!',
      message: 'Do you want to<strong>logout</strong>!!!',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          handler: () => {
            this.logout();
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
