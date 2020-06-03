import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoneyPage } from './money.page';

describe('MoneyPage', () => {
  let component: MoneyPage;
  let fixture: ComponentFixture<MoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
