import { getWordDeclination } from '@/utils/helpers';

describe('getWordDeclination', () => {
  test('check declamation based on provided word and count', () => {
    expect(getWordDeclination('билет', ['ов', '', 'а'], 0)).toEqual('билетов');
    expect(getWordDeclination('билет', ['ов', '', 'а'], 111)).toEqual('билет');
    expect(getWordDeclination('билет', ['ов', '', 'а'], 52)).toEqual('билета');
  });
});
