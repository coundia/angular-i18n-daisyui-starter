import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoggedInComponent } from './navbar-logged-in.component';

describe('NavbarLoggedInComponent', () => {
  let component: NavbarLoggedInComponent;
  let fixture: ComponentFixture<NavbarLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLoggedInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
