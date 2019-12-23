# great-pizza

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Start the application

Run the following script inside the folder:

```
npm install
```

Configure database connection, update the file 'src/datasources/pizza.datasource.config.json':
```json
{
  "name": "Pizza",
  "connector": "mongodb",
  "url": "mongodb://<user>:<password>@ds257698.mlab.com:57698/pizzadb",
  "host": "",
  "port": 0,
  "user": "",
  "password": "",
  "database": "",
  "useNewUrlParser": true
}
```

Start the application with:

```
npm start
```

The backend server will be accessible from:
```
http://localhost:3000
```
