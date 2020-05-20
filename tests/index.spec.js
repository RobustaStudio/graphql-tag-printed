const TodoQueries = require('./Test.gql');

test('it maps graphql files to printed queries', () => {
  expect(Object.keys(TodoQueries)).toEqual(['Todos', 'CreateTodo']);

  expect(typeof TodoQueries.Todos).toBe('string');
  expect(typeof TodoQueries.CreateTodo).toBe('string');
});
