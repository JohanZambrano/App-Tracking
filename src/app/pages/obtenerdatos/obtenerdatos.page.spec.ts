import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObtenerdatosPage } from './obtenerdatos.page';

describe('ObtenerdatosPage', () => {
  let component: ObtenerdatosPage;
  let fixture: ComponentFixture<ObtenerdatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerdatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObtenerdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
