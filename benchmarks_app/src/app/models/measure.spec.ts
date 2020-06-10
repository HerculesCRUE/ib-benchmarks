import { Measure } from './measure';

describe('Measure', () => {
  it('should create an instance of Measure', () => {
    expect(new Measure(
      'groupKey1',
      'measureKey1',
      {
        'tripleStoreId':'tripleStore-1',
        'tripleStoreName': 'tripleStoreName-1',
        'value': 'value-1',
        'comment': 'comment-1',
        'link': 'link-1',
        'tag': 'tag-1',
        'score': '1',
        'applicableRatio': '1',
        'uncertainty': '1'
      }
      )).toBeTruthy();
  });
});
