import Presenter from './Presenter';

describe('Presenter:', () => {
  test('should return class', () => {
    const mockClassModel = jest.fn();
    const mockClassView = jest.fn();

    expect(new Presenter(new mockClassModel(),new mockClassView())).toBeInstanceOf(Presenter);
  });
});
