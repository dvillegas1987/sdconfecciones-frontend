import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoListEntregadosComponent } from './pedido-list-entregados.component';

describe('PedidoListEntregadosComponent', () => {
  let component: PedidoListEntregadosComponent;
  let fixture: ComponentFixture<PedidoListEntregadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoListEntregadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoListEntregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
