import { TripleStore } from './triple-store';

describe('TripleStore', () => {
  it('should create an instance of TripleStore', () => {
    expect(new TripleStore(
      {
        'id':'1',
        'name': 'name',
        'description': 'description',
        'distributor': 'distributor',
        'webSite': 'webSite',
        'tecnicalDocumentation': 'tecnicalDocumentation',
        'commentsOfInterest': 'commentsOfInterest',
        'caseUse': 'caseUse',
        'logo': 'logo'
      }
      )).toBeTruthy();
  });
});
