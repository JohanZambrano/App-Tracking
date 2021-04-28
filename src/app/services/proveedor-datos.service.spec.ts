import { TestBed } from '@angular/core/testing';

import { ProveedorDatosService } from './proveedor-datos.service';

describe('ProveedorDatosService', () => {
  let service: ProveedorDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
