# Mapping Accidents in Kenya

## Description
The Accidents application 
- Report accidents with location attribute


Created on, May 19th 2018

[accident application demo ](https://www.youtube.com/watch?v=pM1moK0JSQc&t=30s "Accidents app")

## Technologies used
+ Django
+ Geodjango
+ Jquery
+ Leafletjs
+ HTML5
+ Css3
+ Postgresql
+ Postgis
+ Git

## Development and Setup.
### prerequisites
- Python 3.6 should be installed
- django 1.11
- install other packages provided in the requirements.txt file
- Running the application.
- Visit this link to view on any browser.

### Installation.
- Ensure python3.6 is installed.
- Clone the repository git clone <repo url>
- create a virtual environment virtualenv <envname> and activate source <envname>/bin/activate
- Install the required packages pip3 install -r requirements.txt
- Create a postgresql database.
- open the psql terminal by typing psql -h localhost -U <username>
- Once on the psql terminal create the database ```CREATE DATABASE ``
- Create postgis extension ```CREATE EXTENSION postgis``` and ```CREATE EXTENSION postgis-topology```
- Quit the shell \q
- Once the database is setup, make migrations, this creates database schemas for the application python manage.py -makemigrations
- Then create the actual database tables by python manage.py migrate
- Start the application by python manage.py runserver and open http://127.0.0.1:8000 in the browser.
  
## Test Driven Development
Testing was done using python inbuild test tool called unittest to test database and form models.

## Reccomendations
- Implement geo-odk forms for data collection using android phones.
- Web mapping portal functionalities such as legend improving car simulation.
  
## Further help
To get Further help you can visit the official python and django documentation.

## Licence
MIT (c) 2017 muriithi derrick
