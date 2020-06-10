import { Metric } from './metric';

describe('Metric', () => {
  it('should create an instance of Metric', () => {
    expect(new Metric(
      {
        'id':'1',
        'name':'nombre',
        'description':'description',
        'range':'[1,2,3]',
        'weight':'1',
        'uncertainty':'0'
      }
    )).toBeTruthy();
  });
});
