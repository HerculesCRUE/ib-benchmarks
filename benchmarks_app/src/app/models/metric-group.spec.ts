import { MetricGroup } from './metric-group';

describe('MetricGroup', () => {
  it('should create an instance of MetricGroup', () => {
    expect(new MetricGroup(
      {
        'id':'1',
        'name': 'metric-group-1',
        'description': 'description',
        'weight': '1',
        'uncertainty': '0',
        'metricas': [
          {
            'id':'1',
            'name':'nombre',
            'description':'description',
            'range':'[1,2,3]',
            'weight':'1',
            'uncertainty':'0'
          }
        ]
      }
      )).toBeTruthy();
  });
});
