import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalizaPage } from './localiza.page';

describe('LocalizaPage', () => {
  let component: LocalizaPage;
  let fixture: ComponentFixture<LocalizaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
