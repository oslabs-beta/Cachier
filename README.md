# Cachier

Welcome to Cachier, a lightweight GraphQL caching tool that is configured specifically for GraphQL to reduce load times and minimize data fetching.  

GraphQL does not have native HTTP caching as a result of its singular employment of the POST method, forcing the danger of over-fetching by re-running queries and slowing load times. 

Cachier currently offers:
- storage inside session storage for client side caching
- ability to choose between Redis and a native in memory cache.
- unique key generation for response data to avoid developer having to tag for cache.
- partial and exact matching for query fields in the developer's GraphQL API.
- Highly configurable eviction policies.


We created a highly performant and customizable GraphQL caching library that consists of three main caching functions.
- Cachier Normalized Server-side Cache
- Cachier Direct Server-side Cache
- Cachier Direct Client-side Cache

We will go over each solution in detail below.



## Cachier Normalized Server-side Cache

Cachiers Normalized Server-side Cache breaks up GraphQL queries into individual sub-queries to be stored in the cache. This provides maximum cache efficency by organizing data in a way that prevents data redundancy and allows for partial retrievals of subset data, thus drastically reducing network requests to the database.

### How it works 


Example Fetch to SpaceX GQL API:

``fetch('http://localhost:3000/partialCache', {
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
          })``
          
The client will fetch to the Cachier Cache endpoint with an object containing the query string and the unique types. The unique types need contain a unique identifier for all array/list items so that Cachier can generate a unique cache key. 

 
 ```
 {
   "typesArr": [
      "dragons"
   ],
   "cacheKeysArr": [
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
```

          
         
 Cachier parses incoming GraphQL queries and seperates them into subqueries stored in a "Cachier" object. The queries are broken up into 3 arrays typesArr, cacheKeysArr , and fieldsArr where their respective indexes connect with one another. FieldsArr will be an array of arrays containing the fields for each cacheKey, if a field is nested it will be stored as a nested object. We will then wait for the return Data and use this "Cachier" query object to sort the data into our cache.
 

Here is data returned from our example query:

```{
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
}```


After receiving the data back Cachier will utilize the query map stored in the "Cachier" Object to normalize and store the data as individual keys inside the cache. This is how the data will look once normalized and stored in the cache:

```{
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
}```

As you can see the dragons array now only stores references to keys in the cache and the data from the array is stored as seperate keys unique in the cache. This normalized cache structure eliminiates data redundancy in the cache and allows for partial retrieval of subset data. (You can ignore the "__CachierCacheData" fields and the number at the last index array, that is for our eviction policy which we will speak about next).




          
          
          
          
          











## If using Redis
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
Andy Zheng || [Github](https://github.com/andy5313) || [Linkedin](https://www.linkedin.com/in/andyzheng5313/)\
Dhruv Thota || [Github](https://github.com/L05Dhruv) || [Linkedin](https://www.linkedin.com/in/dhruv-thota/)\
Jonathan Chen || [Github](https://github.com/jchen0903i) || [Linkedin](https://www.linkedin.com/in/jonathan-chen3/)\
Kaju Sarkar || [Github](https://github.com/kajusarkar) || [Linkedin](https://www.linkedin.com/in/kaju-sarkar-a6329862/)\
Roman Darker || [Github](https://github.com/romanjamesd) || [Linkedin](https://www.linkedin.com/in/roman-darker-707147175/)

## Works cited
- LRU based small latency first replacement (SLFR) algorithm for the proxy cache. (2003). Proceedings IEEE/WIC International Conference on Web Intelligence (WI 2003). https://doi.org/10.1109/wi.2003.1241250
- Wang, Y., Yang, J., & Wang, Z. (2020). Dynamically Configuring LRU Replacement Policy in Redis. The International Symposium on Memory Systems. https://doi.org/10.1145/3422575.3422799
- Morales, K., & Lee, B. K. (2012). Fixed Segmented LRU cache replacement scheme with selective caching. 2012 IEEE 31st International Performance Computing and Communications Conference (IPCCC). https://doi.org/10.1109/pccc.2012.6407712


## License
Distributed under the MIT license.
