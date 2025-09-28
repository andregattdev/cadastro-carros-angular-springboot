import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoriosformComponent } from './acessoriosform.component';

describe('AcessoriosformComponent', () => {
  let component: AcessoriosformComponent;
  let fixture: ComponentFixture<AcessoriosformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoriosformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoriosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
