import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
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
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-polling-agent',
  templateUrl: './polling-agent.page.html',
  styleUrls: ['./polling-agent.page.scss'],
})
export class PollingAgentPage implements OnInit {
 
  selectedSegment = 'presidential';

  isLoading = false;
  presidentialForm: FormGroup;
  parliamentaryForm: FormGroup;

  data = {
    district_id: null,
    polling_station_id: null,
    npp: null,
    ndc: null,
    gum: null,
    cpp: null,
    gfp: null,
    gcpp: null,
    apc: null,
    lpg: null,
    pnc: null,
    ppp: null,
    ndp: null,
    independent: null,
    spoilt_ballot: null
  }

  parData = {
    district_id: null,
    polling_station_id: null,
    npp: null,
    ndc: null,
    gum: null,
    cpp: null,
    gfp: null,
    gcpp: null,
    apc: null,
    lpg: null,
    pnc: null,
    ppp: null,
    ndp: null,
    independent: null,
    spoilt_ballot: null
  }
  isPolls = false;
  allPolls: any;
  allDistricts: any;

  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private auth: AuthenticationService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController
  ) { 
    this.presidentialForm = formBuilder.group(
      {
        district_id: [null, Validators.required],
        polling_station_id: [null, Validators.required],
        npp: [null, Validators.required],
        ndc: [null, Validators.required],
        gum: [null, Validators.required],
        cpp: [null, Validators.required],
        gfp: [null, Validators.required],
        gcpp: [null, Validators.required],
        apc: [null, Validators.required],
        lpg: [null, Validators.required],
        pnc: [null, Validators.required],
        ppp: [null, Validators.required],
        ndp: [null, Validators.required],
        independent: [null, Validators.required],
        spoilt_ballot: [0, Validators.required]
      }
    );
    this.parliamentaryForm = formBuilder.group(
      {
        district_id: [null, Validators.required],
        polling_station_id: [null, Validators.required],
        npp: [null, Validators.required],
        ndc: [null, Validators.required],
        gum: [null, Validators.required],
        cpp: [null, Validators.required],
        gfp: [null, Validators.required],
        gcpp: [null, Validators.required],
        apc: [null, Validators.required],
        lpg: [null, Validators.required],
        pnc: [null, Validators.required],
        ppp: [null, Validators.required],
        ndp: [null, Validators.required],
        independent: [null, Validators.required],
        spoilt_ballot: [0, Validators.required]
      }
    );
  }

  ngOnInit() {
    this.getDistricts();

    // console.log(this.user.id);
  }

  getDistricts() {
    this.auth.get('district').subscribe(
      (response) => {
        // console.log(response);
        if (response['data'] !== null || response['data'] !== undefined) {
          this.allDistricts = response['data'];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPollingStations(id) {
    this.isPolls = false;
    this.presidentialForm.get('polling_station_id').setValue(null);
    this.auth.show('district-polls', id).subscribe(
      (response) => {
        if (response['data'] !== null || response['data'] !== undefined) {
          this.allPolls = response['data'];
          
          this.isPolls = true;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buildData() {
    this.data.district_id = this.user.district_id;
    this.data.polling_station_id = this.user.polling_station_id;
    this.data.npp = this.presidentialForm.controls['npp'].value;
    this.data.ndc = this.presidentialForm.controls['ndc'].value;
    this.data.gum = this.presidentialForm.controls['gum'].value;
    this.data.cpp = this.presidentialForm.controls['cpp'].value;
    this.data.gfp = this.presidentialForm.controls['gfp'].value;
    this.data.gcpp = this.presidentialForm.controls['gcpp'].value;
    this.data.apc = this.presidentialForm.controls['apc'].value;
    this.data.lpg = this.presidentialForm.controls['lpg'].value;
    this.data.pnc = this.presidentialForm.controls['pnc'].value;
    this.data.ppp = this.presidentialForm.controls['ppp'].value;
    this.data.ndp = this.presidentialForm.controls['ndp'].value;
    this.data.independent = this.presidentialForm.controls['independent'].value;
    this.data.spoilt_ballot = this.presidentialForm.controls['spoilt_ballot'].value;
  }


  enterPresidentialVotes() {
    this.isLoading = true;
    this.buildData();
    console.log(this.data);
    this.auth.store('presidential-votes', this.data).subscribe(
      (response) => {
        this.isLoading = false;
        this.alert.success(response['message']);
        this.getPresidentialVotes();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }


  getPresidentialVotes() {
    this.isLoading = true;
    this.auth.get('presidential-votes').subscribe(
      (response) => {
        console.log('Pres Votes', response);
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


  buildParDataa() {
    this.parData.district_id = this.user.district_id;
    this.parData.polling_station_id = this.user.polling_station_id;
    this.parData.npp = this.parliamentaryForm.controls['npp'].value;
    this.parData.ndc = this.parliamentaryForm.controls['ndc'].value;
    this.parData.gum = this.parliamentaryForm.controls['gum'].value;
    this.parData.cpp = this.parliamentaryForm.controls['cpp'].value;
    this.parData.gfp = this.parliamentaryForm.controls['gfp'].value;
    this.parData.gcpp = this.parliamentaryForm.controls['gcpp'].value;
    this.parData.apc = this.parliamentaryForm.controls['apc'].value;
    this.parData.lpg = this.parliamentaryForm.controls['lpg'].value;
    this.parData.pnc = this.parliamentaryForm.controls['pnc'].value;
    this.parData.ppp = this.parliamentaryForm.controls['ppp'].value;
    this.parData.ndp = this.parliamentaryForm.controls['ndp'].value;
    this.parData.independent = this.parliamentaryForm.controls['independent'].value;
    this.parData.spoilt_ballot = this.parliamentaryForm.controls['spoilt_ballot'].value;
  }


  enterParliamentaryVotes() {
    this.isLoading = true;
    this.buildParDataa();
    // console.log(this.data);
    this.auth.store('parliamentary-votes', this.parData).subscribe(
      (response) => {
        this.isLoading = false;
        this.alert.success(response['message']);
        this.getPresidentialVotes();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

// getting parliament votes
  getParliamentaryVotes() {
    this.isLoading = true;
    this.auth.get('parliamentary-votes').subscribe(
      (response) => {
        console.log('Par Votes', response);
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

// segement
  segmentChanged(event) {
    this.selectedSegment = event.target.value;
  }

  // logout function
  logout() {
    localStorage.clear();
    // console.log('Logout success');
    this.router.navigate(['/welcome/']);
  }

  // logout modal
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'logout!',
      message: 'Do you want to <strong>logout</strong>!!!',
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
