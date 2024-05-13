# mail_relay

## Getting started

- Clone repo
- Set env variables (TODO: Add description on all variables)
- Run `docker compose up`
- on the backend container run `python app/init_db.py` to initialize the table creation

## Environment Variables

A detailed explanation of the required environment variables is provided below:

    NEXT_PUBLIC_PROD: Indicates if the environment is production. true for production.

    DATABASE_URL: URL for connecting to the PostgreSQL database for production. Format: postgresql+psycopg2://<user>:<password>@<host>/<dbname>.

    TEST_DATABASE_URL: URL for connecting to the PostgreSQL database for testing. Similar format to DATABASE_URL.

    TESTING: Indicates if the environment is for testing. true for testing.

    WATCHPACK_POLLING: Enables polling for file changes in environments like Docker where file system events might not work. true to enable.

    NEXT_PUBLIC_BACKEND_HOST: The host address for the backend API.

    NEXT_PUBLIC_BACKEND_PORT: The port on which the backend API is running.

    NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: Cloudflare site key for CAPTCHA.

    SECRET_KEY: Secret key used for signing tokens and other security-related operations.

    ALGORITHM: Algorithm used for token encoding (e.g., HS256).

    ACCESS_TOKEN_EXPIRE_MINUTES: Expiration time for access tokens in minutes.

    CORS_ORIGINS: Origins allowed to make cross-origin requests to the backend.

    CLOUDFLARE_SECRET_KEY: Secret key for Cloudflare operations.

    POSTGRES_USER: PostgreSQL database user.

    POSTGRES_PASSWORD: PostgreSQL database password.

    POSTGRES_DB: PostgreSQL database name.

    TEST_DATABASE_NAME: Name of the test database.

    ALLOW_EMPTY_SENDER_DOMAINS: Allows sending emails from domains without a specified sender domain. true to allow.

    ALLOWED_SENDER_DOMAINS: Space-separated list of domains allowed to send emails.

    POSTFIX_message_size_limit: Maximum size limit for messages in bytes. E.g., 31457280 for 30MB.

    POSTFIX_myhostname: Hostname for the Postfix server.

    POSTFIX_mydestination: Destination domain(s) for Postfix.

    POSTFIX_mynetworks: Networks allowed to use the Postfix server. E.g., 0.0.0.0/0 to allow all networks.

    POSTFIX_virtual_alias_maps: Configuration file for virtual alias maps.

    POSTFIX_virtual_alias_domains: Domains used for virtual aliases.

    POSTFIX_smtpd_recipient_restrictions: Restrictions for email recipients, critical for preventing abuse of the server.

    POSTFIX_local_recipient_maps: Configuration for local recipient maps.

    DKIM_AUTOGENERATE: Enables automatic generation of DKIM keys for email security. true to enable.

### Project Structure Explanation:

- **project_root/**: This is the root directory of the entire project.
  - **backend/**: Contains all the backend related code.
    - **app/**: The main backend application directory.
      - **api/**: Contains the API routes or endpoints.
        - **aliases.py**: Endpoints related to aliases.
        - **users.py**: Endpoints related to users.
      - **core/**: Core components.
        - **config.py**: General configuration for the application.
        - **database.py**: Database configurations and initializations.
        - **security.py**: Security configurations, including hashing and token operations.
      - **crud/**: CRUD (Create, Read, Update, Delete) operations.
        - **crud_aliases.py**: CRUD operations for aliases.
        - **crud_users.py**: CRUD operations for users.
      - **models/**: ORM (Object Relational Mapping) models.
        - **aliases.py**: ORM model for aliases.
        - **users.py**: ORM model for users.
        - **webauth_keys.py**: ORM model for web authentication keys.
      - **tests/**: Contains all the tests for the application.
        - **test_aliases.py**: Tests for alias endpoints.
        - **test_users.py**: Tests for user endpoints.
      - **main.py**: The main entry point for the application.
  - **frontend/**: Contains all frontend related files and directories
  - **db-init-scripts/**: Contains scripts that are executed during the initialization of the database container.
  - **.env**: Environment variables of the project.
  - **docker-compose.yml**: Configuration for Docker Compose. Used to define and run multi-container Docker applications.
