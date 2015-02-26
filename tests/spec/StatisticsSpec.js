describe("Statistics", function() {
  beforeEach(function() {
  });

  afterEach(function() {
  });

  it('should have a name', function(){
      var statistic = new ff.Statistic('correct name');

      expect(statistic.name).toEqual('correct name');
  });

  it('should have a zero initial and current values', function(){
      var statistic = new ff.Statistic('a statistic');

      expect(statistic.currentValue()).toEqual(0);
      expect(statistic.initialValue()).toEqual(0);
  });

  it('should have an initial value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);

      expect(statistic.initialValue()).toEqual(4);
  });

  it('should have a current value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.currentValue(4);

      expect(statistic.currentValue()).toEqual(4);
  });

  it('should decrement current value when decremented', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.decrement();

      expect(statistic.currentValue()).toEqual(3);
  });

  it('should not decrement initial value when decremented', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.decrement();

      expect(statistic.initialValue()).toEqual(4);
  });

  it('should decrement when decrementing by value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.decrementValue(2);

      expect(statistic.currentValue()).toEqual(2);
      expect(statistic.initialValue()).toEqual(4);
  });

  it('should not decrement below zero when decrementing', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(0);

      statistic.decrement();

      expect(statistic.currentValue()).toEqual(0);
      expect(statistic.initialValue()).toEqual(4);
  });

  it('should not decrement below zero when decrementing value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(1);

      statistic.decrementValue(2);

      expect(statistic.currentValue()).toEqual(0);
      expect(statistic.initialValue()).toEqual(4);
  });

  it('should decrement initial value when decrementing initial value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(2);

      statistic.decrementInitial();

      expect(statistic.initialValue()).toEqual(3);
      expect(statistic.currentValue()).toEqual(2);
  });

  it('should not decrement initial value below zero when decrementing initial value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(0);

      statistic.decrementInitial();

      expect(statistic.initialValue()).toEqual(0);
  });

  it('should decrement initial value below current when decrementing initial value', function(){
    // FF books may allow the initial value to be below the intial value
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.decrementInitial();

      expect(statistic.initialValue()).toEqual(3);
      expect(statistic.currentValue()).toEqual(4);
  });

  it('should increment initial value when incrementing initial value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.incrementInitial();

      expect(statistic.initialValue()).toEqual(5);
      expect(statistic.currentValue()).toEqual(4);
  });

  it('should increment current value when incrementing', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.increment();

      expect(statistic.initialValue()).toEqual(4);
      expect(statistic.currentValue()).toEqual(5);
  });

  it('should increment current value when incrementing current value', function(){
      var statistic = new ff.Statistic('a statistic');
      statistic.initialValue(4);
      statistic.currentValue(4);

      statistic.incrementValue(2);

      expect(statistic.initialValue()).toEqual(4);
      expect(statistic.currentValue()).toEqual(6);
  });

  it('should not update viewmodel statistics below zero', function(){
      var character = new ff.Character('bob');
      var newValues = { stamina: -1 };

      character.updateViewModel(newValues);

      expect(character.stamina.currentValue()).toEqual(0);
  });
});