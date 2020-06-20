# API4ads

> REST API that allows to create ads, list and filter them! 

![api results](https://github.com/gemasegarra/api4ads/blob/master/public/images/0.png)

API4ads is an API for advertising items. Users can create new ads, search, filter and sort the existing ones. 

## Live version 🚀🚀
API4ads v1. deployed version [here!](http://ec2-18-191-25-114.us-east-2.compute.amazonaws.com/) || Live version of Wall-Ads (frontend app made with React ⚛️ , link to repo [here](https://github.com/gemasegarra/wallAds)) [here!](http://18.191.25.114/) 

## Getting started 

To run this project locally do the following:

- Clone the project
- Run ```npm install``` to install all the dependencies
- Run ```npm run install-db``` to seed database 
- Run ```npm run ads-thumbnails-worker``` so thumbnails for uploaded photos can be created
- Run ```npm start```  to start server on http://localhost:3000/ in **development mode**
- Or run ```npm run dev``` to start server in **production mode**


## API documentation  📖

**New feature:**
Authentication via JTW has been implemented to the API. To access apiv1/ads you will need a JWT. 
An user has been created for testing. 

````
email: user@example.com
password: 1234
````

![user token](https://github.com/gemasegarra/api4ads/blob/master/public/images/6.png)

/apiv1/authenticate with POST method will create a token if credentials are valid or return a ```401 Unauthorized``` error if user or password are not valid. This token will be used as a query string to access the API data via /apiv1/ads?token=token.

| Method | Endpoint                    | Response                                             |
|--------|-----------------------------|------------------------------------------------------|
| POST   | /apiv1/authenticate         | token to access apiv1/ads if credentials are correct |
| GET    | /apiv1/ads                  | without a valid token, ```401 Unauthorized``` error  |
| GET    | /apiv1/ads?token=validtoken | json data with all ads                               |
| POST   | /apiv1/ads                  | creates a new ad                                     |
| GET    | /apiv1/ads/{ad.id}          | json data of an ad by id                             |
| GET    | /apiv1/tags                 | json data with the allowed tags and the tags in use  |

The API allows to create a new ad using the ```/apiv1/ads``` endpoint with a POST method. 

**New feature!**
Pictures can now be uploaded as a file from your machine and will be saved on public/uploads folder. If ```ads-thumbnails-worker``` is running a thumbnail of the picture with size 100x100 will be created and saved too.

![picture upload](https://github.com/gemasegarra/api4ads/blob/master/public/images/7.png)

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
- Filter ads by min price: **?price=*-number***
- Filter ads by max price: **?price=*number-***
- Filter ads by min and max price: **?price=*number-number*** i.e ?price=10-20 will return all ads with a price between 10 and 20
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

 ```http://localhost:3000/apiv1/ads?name=The%20Outer%20Worlds```  
![result example](https://github.com/gemasegarra/api4ads/blob/master/public/images/1.png)

Several filters can be used at once:

```http://localhost:3000/apiv1/ads?tag=lifestyle&onSale=false``` 

![result example](https://github.com/gemasegarra/api4ads/blob/master/public/images/2.png)


```http://localhost:3000/apiv1/ads?sort=price&onSale=true```

![result example](https://github.com/gemasegarra/api4ads/blob/master/public/images/3.png)


## Api4ads Website

![website image](https://github.com/gemasegarra/api4ads/blob/master/public/images/4.png)

You can see all the created ads and filter them on http://localhost:3000, rendered with EJS and CoreUI. 

**New feature!** 

![english to spanish](https://github.com/gemasegarra/api4ads/blob/master/public/images/8.gif)

Now it's possible to change the website language between English and Spanish.

![website image](https://github.com/gemasegarra/api4ads/blob/master/public/images/5.png)

Creating a new ad through the website is not implemented yet.



## Built with 

- NodeJS & Express
- MongoDB & Mongoose

## Author 👩🏻‍💻

<table>
<tr>
<td align="center"><a href="https://github.com/gemasegarra"><img src="https://avatars2.githubusercontent.com/u/40056297?v=4" width="100px;" alt="Gema avatar"/><br/><sub><b>Gema</b></sub></a><br/><a href="https://github.com/gemasegarra"></a>
</table>

---
