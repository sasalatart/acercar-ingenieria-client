# Acercar Ingeniería Client

## About

Client built on top of React for a project of the Centro de Alumnos de Ingeniería UC (CAi) that started in 2014 because of a detected need of new students to approach the professional reality of Engineering. This project seeks to gather in the same portal articles, news, videos, research and interesting projects so that students can make a better decision about what Major to follow.

## Technologies Used

- [React 16.2.0](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Pusher](https://pusher.com/)

## Development Setup

1. Clone and cd into this repository.
2. Run `yarn install` to install npm dependencies.
3. Make sure to have the [API](https://github.com/sasalatart/acercar-ingenieria-api) running on port 3001.
4. Export your pusher credentials environment variables:

  ```sh
  export REACT_APP_PUSHER_KEY=<your-pusher-key>
  export REACT_APP_PUSHER_CLUSTER=<your-pusher-cluster>
  ```

5. Run `yarn start` to run the application on port 3000.

## Docker Setup

### Building the Container

In order to let the container know what is the host and port for the API, it must be built with `CLIENT_URL` and `API_URL` `ARG` values. You must also pass your pusher credentials in order to enable real-time features:

```sh
docker build --build-arg CLIENT_URL=<you-client-url> \
             --build-arg API_URL=<your-api-url> \
             --build-arg PUSHER_KEY=<your-pusher-key> \
             --build-arg PUSHER_CLUSTER=<your-pusher-cluster> \
             -t sasalatart/acercar-ingenieria-client .
```

### Running the Container

```sh
$ docker run -d --name=acercarclient -p 80:5000 sasalatart/acercar-ingenieria-client
```

The server's machine should now be redirecting its port 80 to the container's port 5000.

## API

Ruby on Rails API can be found [in this repo](https://github.com/sasalatart/acercar-ingenieria-api).

## Credits

Some of the assets used in the project are licensed as Creative Commons CCBY, from [The Noun Project](https://thenounproject.com/). These are:

- [Article](https://thenounproject.com/term/article/1091930/) by Creative Stall
- [School](https://thenounproject.com/term/school/1276289/) by AliWijaya
- [User](https://thenounproject.com/term/user/1688840/) by Alena Artemova

If you wish to use them, you must give credit to their authors.
