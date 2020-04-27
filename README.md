# Video Catalog

---

Simple video Create/Edit project. Images, Icon, logo and design by own authory.

## Running Project:

```
docker-compose up
```

and the application will open on port 3000

## e2e testing

```
yarn test
```

## integration tests

```
npm test
```

## Q / A

1.How do you intend to approach this project? What technologies have you decided to use for each part?

The objective is use as main technologies React.js(using Material UI framework) with Node.js stack, using a NoSQL database to make a basic CRUD structure, integrating with OMDb API, to create an better experience to the Test Project

b. Do you find this to be particularly challenging in any of its requirements?
The MVP structure, considering the short time to deploy a complete solution (beside the little scope)

c. If you had a lot of time to do this, what would you do differently?
Use a more robust project pattern (like gitflow not one repo pattern), design customization (to improve the identity of the product), create more tests (integration, not only e2e), not focusing too much in unit (won't cover a running scenario) if the SOLID, KISS and DRY principles were used
