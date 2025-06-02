# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/YaroslavaGD/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout dev
npm install
```

## Create .env file (based on .env.example)

```
./.env
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

or

```
npm run test-users
npm run test-tracks
npm run test-albums
npm run test-artists
npm run test-favorites
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Project Structure

**Modules:** User, Artist, Album, Track, Favorites

### Features:

- CRUD operations for Users, Artists, Albums, Tracks
- Add/remove favorites (Artists, Albums, Tracks)
- Input data validation
- Proper HTTP status code responses
- In-memory data storage (to be replaced with DB in future tasks)

## 📖 Notes

- The repository created from [this template](https://github.com/rolling-scopes-school/nodejs-course-template/generate)
- Repository name: `nodejs2025Q2-service`
