# Api4ads

Api4ads is an API for advertising items. Users can create new ads, search, filter and sort the existing ones. 

## Getting started

To run this project locally do the following:

- Clone the project
- Run ```npm install``` to install all the dependencies
- Run ```npm run install-db``` to initialize database 
- Run ```npm start```  to start server on http://localhost:3000/ in **development mode**
- Or run ```npm run dev``` to start server in **production mode**

## API documentation 


| Endpoints        |            |   |
| ------------- |:-------------:| -----:|
| /apiv1/ads      | returns json data with all ads 
| /apiv1/ads/{ad.id}      | returns json data of an ad by id    
| /apiv1/tags | returns json data with the allowed tags     


The API allows to create a new ad using the ```/apiv1/ads``` endpoint with a POST method. 

All ads will have the following schema:
````

  name: {  
    type: String, 
    required: [true, 'Ads must have a name'],
    unique: true,
    maxlength: [50, 'Ad names must have less than 50 characters']},

  onSale: {
    type: Boolean,
    required: [true, 'You must specify whether you are looking to sell or looking to buy']
  },
  price: {
    type: Number,
    required: [true, 'Ads must have a price']
  },
  photo: String,
  tags: {
    type: [String],
    enum: ['lifestyle', 'mobile', 'motor', 'work']
  },
  description: {
    type: String,
    maxlength: [100, 'Ad descriptions must have less than 100 characters']
  } 

```` 

#### Filtering ads:

The filtering of ads is implemented by using query parameters: 

- Filter ads by name: **?name=*name***
- Filter ads by price: **?price=*number***
- Filter ads by type: **?onSale=*true*** or **?onSale=*false***
- Filter ads by tags: **?tags=*tag***

The API also allows to sort ads, limit the number of shown results (the limit by default is 100 ads) and skip results: 
- Sort ads by name: **?sort=name**
- Sort ads by price: **?sort=price**
- Sort ads by type: **?sort=onSale**
- Sort ads by tags: **?sort=tags**
- Limit results: **?limit=*number***
- Skip results: **?skip=*number***


Examples:

 ```http://localhost:3000/apiv1/ads?name=The%20Outer%20Worlds```   ⚠️ Name filtering is case sensitive! 
![result example](https://raw.githubusercontent.com/gemasegarra/api4ads/master/public/images/1.png?token=AJRTL2OV6JMRXYK3QSZOY726R5X34)

Several filters can be used at once:

```http://localhost:3000/apiv1/ads?tag=lifestyle&onSale=false``` 

![result example](https://raw.githubusercontent.com/gemasegarra/api4ads/master/public/images/2.png?token=AJRTL2J7ST2BG7WQCTJP3RK6R5YHU)


```http://localhost:3000/apiv1/ads?sort=price&onSale=true```

![result example](https://raw.githubusercontent.com/gemasegarra/api4ads/master/public/images/3.png?token=AJRTL2PXMYFOA33XMIRCYJ26R5YJC)
