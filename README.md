# Cache-MoneyQL

Welcome to Cache-MoneyQL, a lightweight GraphQL caching tool that is configured specifically for GraphQL to reduce load times and minimize data fetching.  

GraphQL does not have native HTTP caching as a result of its singular employment of the POST method, forcing the danger of over-fetching by re-running queries and slowing load times. 

We created a library which enables a developer to utilize a server-side cache leveraging a Redis database when querying a GraphQL database.
Our algorithm uses a customized Least Recently Used (LRU) Smallest Latency First Replacement (SLFR) eviction policy. A priority queue keeps track of evictions, using a weighted formula based on recency and latency and is kept separate from the query cache which is still 0(1) in lookup time.


## Getting Started
First, install the Redis package for Node.js

`npm install redis`

Then install our npm package.

## Tech stack used
Node - Express - React - Material-UI - ChartJS - Redis - GraphQL - TypeScript - Jest - Supertest - AWS RDS - Webpack

## Here's how to contribute to our open source library
Our vision for our open-source project is for fellow developers to be able to interate on and improve this tool. This is exactly where you and the community comes in. So, if you have an idea that can make CacheQL better, you can make that idea come to life by following the steps below: 

1. Fork Cache-MoneyQL
2. Pull down our dev branch with command (git pull origin dev)
3. Create your own Feature Branch with the command (git checkout -b <yourFeatureName>)
4. Add your changes with the command (git add .)
5. Stage and commit your changes with the command (git commit -m "<your comment>")
6. Merge your branch with the dev branch locally with the command (git merge dev)
7. Resolve any merge conflicts
8. Push up your branch with the command (git push origin <your feature branch name>)
9. Open a pull request

Please star our repo if you've found this useful, we want to be able to help as many of developers as we can!

## Contributors
Andy Zheng || [Github](https://github.com/andy5313) || [Linkedin](https://www.linkedin.com/in/andyzheng5313/)\
Dhruv Thota || [Github](https://github.com/L05Dhruv) || [Linkedin](https://www.linkedin.com/in/dhruv-thota/)\
Jonathan Chen || [Github](https://github.com/jchen0903i) || [Linkedin](https://www.linkedin.com/in/jonathan-chen3/)\
Kaju Sarkar || [Github](https://github.com/kajusarkar) || [Linkedin](https://www.linkedin.com/in/kaju-sarkar-a6329862/)\
Roman Darker || [Github](https://github.com/romanjamesd) || [Linkedin](https://www.linkedin.com/in/roman-darker-707147175/)

## License
Distributed under the MIT license.
