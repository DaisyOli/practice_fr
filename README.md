# Practice FR - Learning French App

A Ruby on Rails web application for practicing French, designed to facilitate learning through interactive exercises.

## Features

- User authentication system with Devise
- Invitation management for new users
- Two user types: teachers and students
- Creation of practice activities by teachers
- Multiple question types: multiple choice, fill-in-the-blanks, sentence ordering
- Fully French interface
- Responsive design with Bootstrap

## Requirements

- Ruby 3.3.5
- Rails 7.1.5
- PostgreSQL
- Node.js and Yarn (for asset management)

## Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/practice_fr.git
cd practice_fr
```

2. Install dependencies
```bash
bundle install
yarn install
```

3. Configure the database
```bash
cp .env.example .env  # Edit the .env file with your settings
rails db:create
rails db:migrate
rails db:seed  # (optional) Creates initial data
```

4. Start the server
```bash
rails server
```

5. Access the application at http://localhost:3000

## Environment Variables

The following environment variables need to be configured:

- `PRACTICE_FR_DATABASE_PASSWORD`: PostgreSQL database password
- `GMAIL_USERNAME`: Gmail email for sending invitations
- `GMAIL_PASSWORD`: Gmail app password (not the regular password)
- `DOMAIN_NAME`: Application domain
- `SECRET_KEY_BASE`: Rails secret key

## Heroku Deployment

```bash
heroku create
git push heroku main
heroku run rails db:migrate
```

Configure environment variables on Heroku:

```bash
heroku config:set GMAIL_USERNAME=your-email@gmail.com
heroku config:set GMAIL_PASSWORD=your-app-password
heroku config:set DOMAIN_NAME=your-domain.com
```

## Deploy Status
Updated for Heroku deployment on: <%= Date.today %>

## License

[MIT](LICENSE)
