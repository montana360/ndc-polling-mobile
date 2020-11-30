import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PollingAgentPage } from './polling-agent.page';

describe('PollingAgentPage', () => {
  let component: PollingAgentPage;
  let fixture: ComponentFixture<PollingAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingAgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PollingAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
