[![Build Status](https://travis-ci.org/18F/humans-of-18f.svg?branch=master)](https://travis-ci.org/18F/humans-of-18f)

This is a simple quiz to help you learn who everybody at 18F is.

### Quick start

To get started, install [node](http://nodejs.org/) and run:

```
npm install
npm start
```

Then browse to http://localhost:8080/.

### TypeScript editor support

While it's not required for making changes to the codebase, I
*highly* recommend adding [TypeScript Editor Support][] to your editor
of choice. It really makes working on code a lot easier, thanks to
auto-completion and a bunch of other useful features that make it feel
like you've got an experienced coder watching your back.

### Updating the team information

The team information is cached in the repository from the [18f hub API]()
because the API doesn't support CORS and I wanted this app to consist
only of static files. To re-cache the team information, run:

```
npm run update-team
```

### Building and deploying the site

To rebuild and re-deploy the site, run:

```
npm run deploy
```

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the [CC0 1.0
> Universal public domain
> dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.

[18f hub API]: https://github.com/18f/hub/
[TypeScript Editor Support]: https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support
