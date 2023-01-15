<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/Cachier">
    <img src="demo/client/styles/cachierlogo.png" alt="Cachier Logo" title="Cachier Logo" width="520" height="180">
  </a>

<h3 align="center">Cachier</h3>

  <p align="center">
    GraphQL caching tool with custom eviction policies, cache normalization.
    <br />
    <a href="https://cachierql.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/Cachier">View Demo</a>
    ·
    <a href="https://github.com/oslabs-beta/Cachier/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/Cachier/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-and-import">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contact</a></li>
    <li><a href="#works-cited">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

### Built With

 [![React][React.js]][React-url]
 [![Redis][Redis.io]][Redis-url]
 [![GraphQL][GraphQL.io]][GraphQL-url]
 [![Node/Express][Express.io]][Express-url]
 [![TailwindCSS][TailwindCSS.io]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

Welcome to Cachier, a lightweight GraphQL caching tool that is configured specifically for GraphQL to reduce load times and minimize data fetching!

GraphQL does not have native HTTP caching as a result of its singular employment of the POST method, forcing the danger of over-fetching by re-running queries and slowing load times. Our team of engineers developed a compact, easy-to-use solution that allows users to cache their queries on the server side and client side.

#### Cachier currently offers:
- Storage inside session storage for client side caching
- Ability to choose between Redis and a native in memory cache
- Unique key generation for response data to avoid developer having to tag for the cache
- Partial and exact matching for query fields in the developer's GraphQL API
- Highly configurable eviction policies


#### We created a highly performant and customizable GraphQL caching library that consists of three main caching functions:
- Cachier Normalized Server-side Cache
- Cachier Direct Server-side Cache
- Cachier Direct Client-side Cache

We will go over each solution in detail below:

<!-- GETTING STARTED -->
## Getting Started
## Cachier Normalized Server-side Cache

Cachier's Normalized Server-side Cache breaks up GraphQL queries into individual sub-queries to be stored in the cache. This provides maximum cache efficency by organizing data in a way that prevents data redundancy and allows for partial retrievals of subset data, thus drastically reducing network requests to the database.

## Installation and Import
If this is your first time using Cachier's Normalized Cache, run the following command in your terminal.
~~~
npm install @cachier/cache-partials
~~~

In your server file, require our middleware to handle GraphQL requests using the CommonJS format
~~~
const Cachier = require('@cachier/cache-partials');
~~~

## Set up your Cachier middleware function
endpoint - the endpoint that the client will make GraphQL queries to if it wants to utilize the cache.
#### graphQLEndpoint 
- The graphQLEndpoint parameter is where you will specify your GraphQL APIs endpoint. This allows Cachier to route all queries that are unable to be resolved by the Cachier Cache to your GraphQL API.
#### cacheCapacity 
- the cacheCapacity parameter allows you to specify a maximum cache length which allows cachier to know when to evict from the cache. All inputs for Capacity will be multiples of 100. The default parameter for Capacity is 100 (1000 keys in the cache).
#### sampleSize 
- the sampleSize parameter allows the developer to configure the number of random keys that will be considered for eviction. The default sampleSize is 5 which we recommend for most applications.
#### evictionSize 
- the sampleSize parameter allows the developer to configure the number of evictions what will be made when your cache capacity is reached. The default evictionSize is 5.

~~~
app.use(
       endpoint,
       Cachier(graphQLEndPoint, cacheCapacity, sampleSize, evictionSize);
~~~

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- USAGE EXAMPLES -->

## Usage

~~~
app.use( '/Cachier', Cachier('https://api.spacex.land/graphql', 100, 5, 5) );
~~~

To fetch from Cachier's normalized cache you will fetch like you would to your GraphQL API except you will need set the option for uniques in the request body. The uniques object will need to contain a unique identifier for all list items in your query. You will need to include the list name as the key and the unique identifier as a the value. The unique identifier is any piece of data that is queried that is unique to each list item.

~~~
fetch('/graphql', {
  method: 'POST',
   headers:{
     'Content-Type': 'application/json',
     Accept: 'application/json',
 },
    body: JSON.stringify({
      query: queryGraphQLString,
      uniques: {listKey :uniqueIdentifier},
       })
    });
~~~


### How it works 


Example Fetch to SpaceX GQL API:

  ~~~
fetch('http://localhost:3000/partialCache', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: {
                dragons {
                  id
                  return_payload_mass {
                    kg
                  }
                }
              }
              ,
              uniques: { dragons: 'id' },
            }),
          })
        
 ~~~
          
          
The client will fetch to the Cachier Cache endpoint with an object containing the query string and the unique types. The unique types need contain a unique identifier for all array/list items so that Cachier can generate a unique cache key. 

 ~~~
{
   "typesArr": [
      "dragons"
   ],
   "fieldsArr": [
      [
         "__typename",
         "id",
         {
            "return_payload_mass": [
               "__typename",
               "kg"
            ]
         }
      ]
   ]
}
~~~
          
         
 Cachier parses incoming GraphQL queries and seperates them into subqueries stored in a "Cachier" object. The queries are broken up into 2 arrays typesArr, and fieldsArr where their respective indexes connect with one another. FieldsArr will be an array of arrays containing the fields for each cacheKey, if a field is nested it will be stored as a nested object. We will then wait for the return Data and use this "Cachier" query object to sort the data into our cache.
 

Here is data returned from our example query:
~~~
{
  "data": {
    "dragons": [
      {
        "id": "dragon2",
        "return_payload_mass": {
          "kg": 3000
        }
      },
      {
        "id": "dragon1",
        "return_payload_mass": {
          "kg": 3000
        }
      }
    ]
  }
}
~~~

After receiving the data back Cachier will utilize the query map stored in the "Cachier" Object to normalize and store the data as individual keys inside the cache. This is how the data will look once normalized and stored in the cache:
~~~
{
   "dragons": [
      "dragon:dragon2",
      "dragon:dragon1",
      8492.694458007812
   ],
   "dragon:dragon2": {
      "__typename": "Dragon",
      "id": "dragon2",
      "return_payload_mass": {
         "__typename": "Mass",
         "kg": 3000
      },
      "__CachierCacheDate": 8492.681999921799
   },
   "dragon:dragon1": {
      "__typename": "Dragon",
      "id": "dragon1",
      "return_payload_mass": {
         "__typename": "Mass",
         "kg": 3000
      },
      "__CachierCacheDate": 8492.691667079926
   }
}
~~~
As you can see the dragons array now only stores references to keys in the cache and the data from the array is stored as seperate keys unique in the cache. This normalized cache structure eliminiates data redundancy in the cache and allows for partial retrieval of subset data. ("__CachierCacheData" fields and the number at the last index array is to keep track of recency for our eviction policy which we will speak about next).


### Approximated LRU Eviction 

Cachier's Normalized Cache uses a custom Approximated LRU Eviction Policy. This is not a true LRU implementation, but it comes very close in terms of performance. The reason Cachier does not use a true LRU implementation is because it costs more memory. Cachier's LRU policy works by creating a sample (the sample size can be configured by the developer) of randomly selected keys from the cache and evicting the least recently used key from the sample.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Cachier Direct Server-side Cache
Cachier's Direct Server-side Cache uses a custom LRU-SLFR (Least Recently Used Smallest Latency First Replacement) policy. LRU-SLFR is very similar to LRU except it takes latency into account as well as recency when evicting. Cachier's LRU-SLFR eviction policy utilizes a linked hash map to achieve true LRU and allows O(1) deletion, lookup, and insertion. Cachier takes latency into account as well as recency by creating a group of least recent queries and removes the query with the lowest latency first. This allows for much smarter evictions compared to traditional LRU. The whole group will be evicted first before moving on to the next group. Check out the demo page for a visualization of the eviction policy

### How to install and import
If this is your first time using Cachier's Direct Server-side Cache, run the following command in your terminal.

~~~
npm install @cachier/server-side
~~~

In your server file, require our middleware to handle GraphQL requests using the CommonJS format

~~~
const Cachier = require('@cachier/server-side')
~~~

### Set up your Cachier middleware function

#### Endpoint 
- The endpoint that the client will make GraphQL queries to if it wants to utilize the cache.
#### graphQLEndpoint 
- The graphQLEndpoint parameter is where you will specify your GraphQL APIs endpoint. This allows Cachier to route all queries that are unable to be resolved by the Cachier Cache to your GraphQL API.
#### capacity 
- the cacheCapacity parameter allows you to specify a maximum cache length which allows cachier to know when to evict from the cache.
#### groupSize 
- the groupSize parameter allows the developer to configure the number of least recently used keys that will be considered for eviction. The key with the least latency out of the group will be evicted first. The whole group will be evicted first before moving on to the next group.
#### RedisClient 
- If you would like to use Redis to store your cache, insert your connected redis client as an arguement. If you leave out this parameter Cachier will default to its native built in cache.


~~~
app.use(
       endpoint,
       Cachier(graphqlEndpoint, capacity, groupSize, RedisClient(optional));
~~~

Example implementation without Redis:

~~~
app.use( '/Cachier', Cachier('https://api.spacex.land/graphql', 100, 5) );
~~~


### If using Redis
First, install the Redis package for Node.js

`npm install redis`

Then install redis npm package.
`npm install _______`
1. Install Redis
- MacOS users: [Redis installation for MacOS](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/)
- Linux users: [Redis installation for Linux](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)
- Windows users: 
1. Redis is not officially supported on Windows, so you must have a [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install).
2. Once you have WSL, follow [Redis installation for Windows](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)


## Cachier Direct Client-side Cache

Cachier's Direct Client-Side Cache uses the same underlying mechanisms as Cachier's Direct Server-side cache except it stores the cache in the client browsers session storage. This allows for even faster cached query times than a server side implementation. Cachier's client side cache was built to mimic a traditional fetch request so it is very easy to integrate into new and existing codebases.

### Installation and Import

If this is your first time using Cachier's Direct Client-side Cache, run the following command in your terminal.

~~~
npm install @cachier/client-side
~~~

In your client file, import the cachier client side function:

~~~
import clientSideCache from '@cachier/client-side';
~~~

### Initalize your Cachier client-side cache

#### capacity 
- the cacheCapacity parameter allows you to specify a maximum cache length which allows cachier to know when to evict from the cache.
#### groupSize 
- the groupSize parameter allows the developer to configure the number of least recently used keys that will be considered for eviction. The key with the least latency out of the group will be evicted first. The whole group will be evicted first before moving on to the next group.

~~~
const cachierFetch = clientSideCache(500, 5);
~~~

Operates exactly like fetch():

~~~
cachierFetch('/graphql', {
  method: 'POST',
   headers:{
     'Content-Type': 'application/json',
     Accept: 'application/json',
 },
    body: JSON.stringify({
      query: queryGraphQLString,
       })
    });
~~~

<!-- ROADMAP -->
## Roadmap

- [ ] Mutation handling
- [ ] Full partial querying
- [ ] Demo with more options
    - [ ] Faster text editor

See the [open issues](https://github.com/oslabs-beta/Cachier/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tech stack used
Node - Express - React - Tailwind CSS - ChartJS - Redis - GraphQL - TypeScript - Jest - Supertest - Webpack 

## Here's how to contribute to our open source library
Our vision for our open-source project is for fellow developers to be able to interate on and improve this tool. This is exactly where you and the community comes in. So, if you have an idea that can make Cachier better, you can make that idea come to life by following the steps below: 

1. Fork Cachier
2. Pull down our dev branch with command  ```git pull origin dev```
3. Create your own Feature Branch with the command ```git checkout -b <yourFeatureName>```
4. Add your changes with the command ```git add .```
5. Stage and commit your changes with the command ```git commit -m "<your comment>"```
6. Merge your branch with the dev branch locally with the command ```git merge dev```
7. Resolve any merge conflicts
8. Push up your branch with the command ```git push origin <your feature branch name>```
9. Open a pull request

Please star our repo if you've found this useful, we want to be able to help as many of developers as we can!

## Contributors
* Andy Zheng || [Github](https://github.com/andy5313) || [Linkedin](https://www.linkedin.com/in/andyzheng5313/)
* Dhruv Thota || [Github](https://github.com/L05Dhruv) || [Linkedin](https://www.linkedin.com/in/dhruv-thota/)
* Jonathan Chen || [Github](https://github.com/jchen0903i) || [Linkedin](https://www.linkedin.com/in/jonathan-chen3/)
* Kaju Sarkar || [Github](https://github.com/kajusarkar) || [Linkedin](https://www.linkedin.com/in/kaju-sarkar-a6329862/)
* Roman Darker || [Github](https://github.com/romanjamesd) || [Linkedin](https://www.linkedin.com/in/roman-darker-707147175/)

## Works cited
- LRU based small latency first replacement (SLFR) algorithm for the proxy cache. (2003). Proceedings IEEE/WIC International Conference on Web Intelligence (WI 2003). https://doi.org/10.1109/wi.2003.1241250
- Wang, Y., Yang, J., & Wang, Z. (2020). Dynamically Configuring LRU Replacement Policy in Redis. The International Symposium on Memory Systems. https://doi.org/10.1145/3422575.3422799
- Morales, K., & Lee, B. K. (2012). Fixed Segmented LRU cache replacement scheme with selective caching. 2012 IEEE 31st International Performance Computing and Communications Conference (IPCCC). https://doi.org/10.1109/pccc.2012.6407712


## License
Distributed under the MIT license.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/Cachier.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/Cachier/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/Cachier.svg?style=for-the-badge
[forks-url]: https://github.com/oslabs-beta/Cachier/network/members
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/Cachier.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/Cachier/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/Cachier.svg?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/Cachier/issues
[license-shield]: https://img.shields.io/github/license/oslabs-beta/Cachier.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/Cachier/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/company/cachier
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redis.io]: https://img.shields.io/badge/Redis-Data%20store-red
[Redis-url]: https://redis.io/
[GraphQL.io]: https://img.shields.io/badge/%20-GraphQL-brightgreen
[GraphQL-url]: https://graphql.org/learn/
[Express.io]: https://img.shields.io/badge/Node-Express-orange
[Express-url]: https://expressjs.com/
[TailwindCSS.io]: https://img.shields.io/badge/%20UI-TailwindCSS%20-blue
[Tailwind-url]: https://v2.tailwindcss.com/docs
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

