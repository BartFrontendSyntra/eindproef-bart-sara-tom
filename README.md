

 ![logo](tobasacode_logo.png)


# Who are we?

Bart Hunderbein

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

## Technstack

<p align="left">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS-1572B6?logo=css&logoColor=white" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white" />
    <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff" />
    <img src="https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" />
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

## Setup and Installation Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **PHP** (version 8.1 or higher)
- **Composer** (PHP dependency manager)
- **Node.js** (version 18 or higher) and **npm**
- **MySQL** (version 8.0 or higher)
- **Angular CLI** (`npm install -g @angular/cli`)

### Database Setup

#### Option 1: Local MySQL Database

1. **Create the database**:
   ```bash
   mysql -u root -p
   CREATE DATABASE forestmaster;
   EXIT;
   ```

#### Option 2: Remote MySQL Database

If you're using a remote MySQL database (e.g., hosted on a cloud provider):

1. **Ensure remote access is enabled** on your MySQL server
   - Check that your MySQL server allows remote connections
   - Verify firewall rules allow connections on port 3306 (or your custom port)
   - Ensure your IP address is whitelisted in the server's security settings

2. **Configure the `.env` file** with your remote database credentials (see API Setup step 4 below)

### API Setup (Laravel Backend)

1. **Navigate to the API directory**:
   ```bash
   cd api
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Copy the environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure the `.env` file**:
   - For **local database**:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=forestmaster
     DB_USERNAME=root
     DB_PASSWORD=your_password
     ```
   - For **remote database**:
     ```
     DB_CONNECTION=mysql
     DB_HOST=your.remote.host.com
     DB_PORT=3306
     DB_DATABASE=remote_database_name
     DB_USERNAME=your_remote_username
     DB_PASSWORD=your_remote_password
     ```
     Replace `your.remote.host.com` with your actual database host (e.g., `db.example.com`, `192.168.1.100`, or cloud provider hostname)


5. **Generate application key**:
   ```bash
   php artisan key:generate
   ```

6. **Run database migrations** (if using a fresh local database):
   ```bash
   php artisan migrate
   ```

7. **Seed the database** (optional on a fresh local database):
   ```bash
   php artisan db:seed
   ```

8. **Start the Laravel development server**:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`

### Front-End Setup (Angular)

1. **Navigate to the front-end directory**:
   ```bash
   cd front-end
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the Angular development server**:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

### Running Both Services

To run the full application, you need both servers running simultaneously:

1. **Terminal 1 - API**:
   ```bash
   cd api
   php artisan serve
   ```

2. **Terminal 2 - Front-End**:
   ```bash
   cd front-end
   ng serve
   ```

Access the application at `http://localhost:4200`, which will communicate with the API at `http://localhost:8000`.

### Troubleshooting

- **Port conflicts**: If port 8000 or 4200 is already in use, you can specify different ports:
  - API: `php artisan serve --port=8001`
  - Front-End: `ng serve --port=4201`

- **CORS issues**: Ensure CORS is properly configured in `api/config/cors.php`

- **Database connection errors**: Verify your `.env` database credentials are correct

- **Remote database connection issues**:
  - Verify the remote host is reachable: `ping your.remote.host.com`
  - Check if the MySQL port is open: `telnet your.remote.host.com 3306`
  - Ensure your IP address is whitelisted on the remote server
  - Verify SSL/TLS requirements (some cloud databases require SSL connections)
  - Check if the database user has proper permissions for remote access

