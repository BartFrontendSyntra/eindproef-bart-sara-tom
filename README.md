

 ![logo](tobasacode_logo.png)


# Who are we?

Bart Hunerbein

Sara Adnane

Tom Larsen

  

# What will we do?

ForestMaster (tbd)
Make an application for rangers, parks, farmers to manage their forests.

## Commandments

- Thou shalt use kebabcase and lowercase for all folders /for-example-folder
- Thou shalt use / and lowercase for branchnaming
	- feature/your-feature-name for new features
	- bugfix/your-bugfix-name for bug fixes
	- hotfix/your-hotfix-name for urgent fixes
	- documenting/your-documentation-name for documentation updates
- Thou shalt use english for documenting and commenting

## Techstack

<p align="left">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS-1572B6?logo=css&logoColor=white" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff" />
    <img src="https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white" />
    <img src="https://img.shields.io/badge/Laravel-2e2e2e?logo=laravel" />
   
</p>

## using branches and pull requests

To use branches and pull requests, follow these steps:

1. **Create a Branch**: Before starting work on a new feature or bug fix, create a new branch from the main branch. Use a descriptive name for the branch that reflects the work being done.


create a new branch using the following command:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**: Work on your changes in the new branch. Commit your changes frequently with clear and descriptive commit messages. Use the following command to commit your changes:
   ```bash
    git add .
    git commit -m "Your descriptive commit message"
    ```
3. **Push the Branch**: Once you have made your changes and committed them, push the branch to the remote repository using the following command:
   ```bash
    git push origin feature/your-feature-name
    ```
4. **Create a Pull Request**: Go to the repository on GitHub (or your chosen platform) and create a pull request from your branch to the main branch. Provide a clear description of the changes made and any relevant information for reviewers.
5. **Review and Merge**: Team members will review the pull request. Address any feedback or requested changes. Once approved, the pull request can be merged into the main branch.
6. **Delete the Branch**: After the pull request has been merged, delete the branch both locally and remotely to keep the repository clean. Use the following commands:
   ```bash
    git branch -d feature/your-feature-name
    git push origin --delete feature/your-feature-name
    ```
By following these steps, you can effectively use branches and pull requests to manage your code changes collaboratively.

---

# Angular CLI Documentation

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
