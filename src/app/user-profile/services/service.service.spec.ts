import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import {UserProfileService} from './service.service';
import {UserProfile} from '../models/user.model';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    code: 1,
    message: 'Success',
    data: {
      id: '123',
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'John',
      lastName: 'Doe',
      telephone: null,
      isAdmin: true,
      isEnabled: true,
      isBan: false,
      isPremium: false,
      limitPerDay: 10,
      roles: ['ROLE_ADMIN'],
      authorities: [{ authority: 'READ' }],
      tenantId: 'tenant-id',
      createdBy: null
    } satisfies UserProfile
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserProfileService
      ]
    });

    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('it should fetch user profile', () => {
    service.getProfile().subscribe(profile => {
      expect(profile).toEqual(mockResponse.data);
      expect(profile.username).toBe('admin');
    });

    const req = httpMock.expectOne('http://127.0.0.1:8095/api/auth/me');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
