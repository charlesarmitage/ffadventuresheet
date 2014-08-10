describe("Book details", function() {
  var store = {};

  beforeEach(function () {

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').andCallFake(function () {
        store = {};
    });
  });

  afterEach(function() {
  });

  it('should save numbers to local storage', function() {
    ff.book.number(102);

    expect(ff.book.number()).toEqual(102);
  });
});