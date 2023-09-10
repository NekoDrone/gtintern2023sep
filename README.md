# Take-Home Assignment

Author: Sylfr Serenity Tan

Frameworks and Libraries: Node.js, Typescript, Babel, Jest.

Linters/Formatters: ESLint, Prettier.

## Requirements

1. Node.js (Developed on v19.6)
2. TypeScript
3. npm

## Usage

1. Clone this repository into a folder `git clone https://github.com/NekoDrone/gtintern2023sep`
2. Open the folder and install dependencies and modules `npm install`
3. To build: `npm run build`
4. To start: `npm run start`. Running this also triggers a build process.

Full setup:

```
git clone https://github.com/NekoDrone/gtintern2023sep
cd gtintern2023sep
npm install
npm run start
```

Test command: `npm run test` with coverage `npm run test-coverage`

# Considerations and Implementation

This portion is rather lengthy, but gives an explanation of some of the design considerations.

## Introduction

The project is a simple enough execution. Read data from an input, if that data exists in one database, retrieve a value from that entry, and compare it to the state in a second database, and perform some resolution.

## Implementation

There are many ways to tackle this. Firstly there are multiple ways to tackle the input. The first test version used a simple `input.txt` and loaded it rather than keying in the command line. An input `csv` would also work for batch querying. The solution implemented was to simply read a string from the command line.

After which, there are many ways to handle the data itself. Either opening a Firestore or Mongo instance, or even some SQL server, load the data, then in the actual execution of the project, load the references and perform the functions. Redis was also briefly considered, as the data exchange was only a few kilobytes in size.

## Considerations

The main consideration that was put into place was extensibility and flexibility, rather than any particular implementation of a database.

Currently, the project simply reads the CSV files, discards the headers, and loads the data into memory as an array. Since the provided staff data is only a few thousand lines in length, this is an adequate placeholder.

To this end, interfaces for all the necessary functions were created, and a temporary implementation of the interface was made. This should afford us a few things.

Firstly, this means that no matter how the data changes, it should be trivial to add new shapes for our data, as the types and the data storage and retrieval is tightly linked, and any changes to one will demand changes to the other.

Secondly, this also means that the implementation of the querying and comparison functions can change as and when it needs to.

Finally, this would mean that so long as we maintain the interface's requirements, we can swap to using any database we want or need to. A connection to Firestore, or a Postgres database would be simple to implement, as a new class that handles these connections can be made, that implements the interface.

Most edits from here on out would be pretty simple, and each part of the system is modular.

After all, this is why TypeScript should be used rather than vanilla JavaScript. Vanilla JS can perform the requirements as listed, but TypeScript's type safety affords this extensibility, and I think this approach showcases what TypeScript is good at, rather than focusing on any particular implementation.
