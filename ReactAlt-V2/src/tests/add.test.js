const add = (a, b) => a + b;
const greetings = name => `Hello, ${name}`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test('should add two numbers', () => {
  const result = greetings('Steph');
  expect(result).toBe('Hello, Steph');
});