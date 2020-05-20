# graphql-tag-printed

> Same development experience as `graphql-tag/loader` but produces GQL queries as strings instead of ASTs

## What

This is a GraphQL `.gql` and `.graphql` webpack loader that uses `graphql-tag/loader` under the hood but with a twist.

Instead of producing ASTs which can be very expensive to parse in runtime

## Why

We were using Magento GraphQL API which has it's own AST parser, meaning we have no real benefit of sending ASTs to the wire so we ended up printing them to strings before sending queries through the network. This causes an overhead of transforming each AST to a string which isn't ideal for some performance metrics like `FID`. And overall it can add up with APIs that not support query batching with too many queries.

This loader solves this by moving the printing logic to build-time instead of run-time. Saving some kilobytes in some cases and parse time.

This is useful if you are using non-JS based GraphQL server and would like to get the same benefits that you would have with `graphql-tag`, like using `.gql` files and GQL fragments.

As an added bonus this module allows you to eliminate `graphql-tag` and `graphql` from your app dependencies.

## Getting Started

Install using `yarn` or `npm`

```sh
yarn add graphql-tag-printed --dev

# or

npm install graphql-tag-printed --dev
```

In your webpack config, add the following rule:

```js
{
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag-printed',
}
```

Now you can import `.gql` files directly in your app files, any imported queries will be stringified and will include any fragments defined as well.

## Performance

In the apps we built this for there are a few considerations to take note of:

- Fragment usage is limited to few queries (Frequent usage of repeated fragments may cause increased bundle size when using this module).
- The apps suffered from bigger performance problems like image optimization, but we were interested more in JavaScript execution time and it's effect.
- Using this module won't improve your performance drastically, in some apps it only gave us 1 perf point and in others it can be as high as 6. It's likely you have other bottlenecks.

While using this module didn't improve performance by much, here is some lighthouse@6 numbers side by side:

[Before](./perf/before.png) and [after](./perf/after.png)

## License

MIT
