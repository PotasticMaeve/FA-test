# FA Test
A simple page for displaying project group by categories 

## Demo App
https://fairatmos.claudiafelicia.com/

## What's inside
- [x] simple page for displaying project group by categories
- [x] card can be sorted based on carbon number
- [x] search feature by title of project
- [x] responsive design

## Installation
This section contains how to install the project on your machine

### Manual
```
$ git clone git@github.com:PotasticMaeve/FA-test.git
$ cd FA-test
$ yarn install
$ yarn start
```

### Using Docker Compose
```
$ docker-compose up -d
```

## Build the project
```
$ yarn build
```

## Deployment
### Build the image
```
$ docker-compose build --no-cache
```

### Push image to dockerhub
```
$ docker login -u <username> -p <password>
$ docker push claudiadev/fa-test:<tag>
```