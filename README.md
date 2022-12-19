# wallet backup

This project is a backup script of investment wallets managed by [status invest](https://statusinvest.com.br/). It is intended to be used as a scheduled cronjob, but can also can be run locally. The goal is to keep your positions, transactions and earnings backed up in case of an outage of the website. The backups are sent to the provided email address.


## Prerequisites

- `Docker`

## Running the script

- Build the image `make docker-build`;
- Provide configuration env vars (it can be provided trough a `.env` file or manually trough single env vars):
    - `EMAIL`: your email address to backup files
    - `PASSWORD`: your email password to backup files
    - `STATUS_INVEST_EMAIL`: your email used to login in status invest
    - `STATUS_INVEST_PASSWORD`: your password used to login in status invest
- Run the script: `docker run --env-file <path to .env file> <image name built>` (or `docker run -e EMAIL=foo -e PASSWORD=bar <other env vars> <image name built>`)

Checkout `/.github/workflows/nodejs.yml` file for a example of a cronjob scheduled trhough github actions.

