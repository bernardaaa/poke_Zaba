import { TestBed } from '@angular/core/testing';

import { ServicepokemoniService } from './servicepokemoni.service';

describe('ServicepokemoniService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicepokemoniService = TestBed.get(ServicepokemoniService);
    expect(service).toBeTruthy();
  });
});
