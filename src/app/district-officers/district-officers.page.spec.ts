import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DistrictOfficersPage } from './district-officers.page';

describe('DistrictOfficersPage', () => {
  let component: DistrictOfficersPage;
  let fixture: ComponentFixture<DistrictOfficersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictOfficersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DistrictOfficersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
