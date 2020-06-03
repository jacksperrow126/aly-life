import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotePage } from './note.page';

describe('NotePage', () => {
  let component: NotePage;
  let fixture: ComponentFixture<NotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
