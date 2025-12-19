# eindproef-bart-sara-tom

Dit is de werkplaats waar Tom, Sara en Bart hun eindproject zullen maken voor de SyntraPxl.

## using branches and pull requests

To use branches and pull requests, follow these steps:

1. **Create a Branch**: Before starting work on a new feature or bug fix, create a new branch from the main branch. Use a descriptive name for the branch that reflects the work being done.

We will always use the following naming convention for branches:

    - feature/your-feature-name for new features
    - bugfix/your-bugfix-name for bug fixes
    - hotfix/your-hotfix-name for urgent fixes
    - documenting/your-documentation-name for documentation updates

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

