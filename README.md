# Welcome to ColaCo's Virtual Vending Machine!
## Introduction

# UX
## User Stories
### Client Users
### Admin
## Design Choices
## Wireframes and Live Application
### Database Wireframes
![Database wireframe](readme/db/dbTable.jpg)
### Application Wireframes
### Live Application

# Technology used

# Testing
## Developer Testing Specifications
### Developer Testing Systems
### Developer Testing Methods

# Bugs and Other Problems
## Bugs
## Other Problems

# Deployment
## GitHub
## Heroku
### Notes
+ Postgres requires a secure connect by default
    + The work around is:
    + Add a config (PGSSLMODE=no-verify)
    + Add an additional line to knexfile.js:
        + ssl: { rejectUnauthorized: false },
        + This should be added after the connection string
+ Due to the requirements of this project (api and user interface sharing single github repo) the migrations for the PostgreSQL database must be done at deployment.
    + The migration string can be found in the scripts of package.json
    + Potientially forward AND backwards migrations can be made here but each will be made at the end of a successful herou build
        + 2 additional scripts required for this are **heroku-postbuild** and this script calls **install-api**

# Tools

# Acknowledgements
