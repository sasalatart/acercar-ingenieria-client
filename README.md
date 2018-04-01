# Acercar Ingeniería Client

## About

Client built on top of React for a project of the Centro de Alumnos de Ingeniería UC (CAi) that started in 2014 because of a detected need of new students to approach the professional reality of Engineering. With a new curriculum come new challenges, and the wide variety of opportunities that are currently offered to students according to their interests and abilities can sometimes confuse and disorient them. This project seeks to gather in the same portal articles, news, videos, research and interesting projects so that students can make a better decision about what Major to follow.

## Technologies Used

- React 16.2.0
- Redux

## Development Setup

1. Clone and cd into this repository.
2. Run `yarn install` to install npm dependencies.
3. Make sure to have the [API](https://github.com/sasalatart/acercar-ingenieria-api) running on port 3001.
4. Run `yarn start` to run the application on port 3000.

## Docker Setup

### Building the Container

In order to let the container know what is the host and port for the API, it must be built with `CLIENT_URL` and `API_URL` `ARG` values:

```sh
docker build --build-arg CLIENT_URL=<you-client-url> \
             --build-arg API_URL=<your-api-url> \
             -t sasalatart/acercar-ingenieria-client .
```

### Running the Container

```sh
$ docker run -d --name=acercarclient -p 80:5000 sasalatart/acercar-ingenieria-client
```

The server's machine should now be redirecting its port 80 to the container's port 5000.


## API

Ruby on Rails API can be found [in this repo](https://github.com/sasalatart/acercar-ingenieria-api).
