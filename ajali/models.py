from django.db import models
from django.contrib.gis.db import models as geomodels
from multiselectfield import MultiSelectField


FACTORS = (
    ('Alcohol', 'Alcohol'),
    ('Overspeeding', 'Overspeeding'),
    ('Driver distracted' , 'Driver distracted'),
    ('Other', 'Other')
)
INVOLVED = (
    ('Driver', 'Driver'),
    ('Pedestrian', 'Pedestrian'),
    ('Cyclist', 'Cyclist'),
    ('Motorist', 'Motorist'),
    ('Other', 'Other')
)
PERSONS = (
    ('Man', 'Man'),
    ('Woman', 'Woman'), 
    ('Child', 'Child'),
    ('Multiple', 'Multiple')
)
CATEGORIES = (
    ('Fatal', 'Fatal'),
    ('Serious', 'Serious'),
    ('Slight','Slight')
)


class Victim(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    occupation = models.CharField(max_length=255)

    def __str__(self):
        return f"Victim {self.id}"



class Car(models.Model):
    owner = models.CharField(max_length=255)
    registrations = models.CharField(max_length=50)
    model = models.CharField(max_length=255)

    def __str__(self):
        return f"Car {self.id}"



class Accident(models.Model):
    report_date = models.DateTimeField(auto_now_add=True)
    accident_date = models.DateTimeField()
    cause = MultiSelectField(max_length=100, choices=FACTORS)
    persons = MultiSelectField(max_length=100, choices=PERSONS)
    victims = models.ForeignKey(Victim)
    cars_involved = models.ForeignKey(Car)
    description = models.TextField()
    road = models.CharField(max_length=255)
    categories = models.CharField(max_length=255, choices=CATEGORIES)
    location = geomodels.PointField(srid=4326)
    objects = geomodels.GeoManager()

    def __str__(self):
        return f'Accident {self.id}'

class AnonymousReporter(models.Model):
    cause = models.CharField(max_length=255, help_text="possible cause", null=False, blank=True)
    report_date = models.DateTimeField(auto_now_add=True)
    accident_time = models.DateTimeField()
    investigated = models.BooleanField(default=False)
    location = geomodels.PointField(srid=4326)
    objects = geomodels.GeoManager()

    class Meta:
        verbose_name_plural = "AnonymousReporter"
    def __str__(self):
        return f'{self.pk}'


class County(models.Model):
    objectid = models.IntegerField()
    area = models.FloatField()
    perimeter = models.FloatField()
    county3_field = models.FloatField()
    county3_id = models.FloatField()
    county = models.CharField(max_length=20)
    shape_leng = models.FloatField()
    shape_area = geomodels.FloatField()
    geom = geomodels.MultiPolygonField(srid=4326)

    def __str__(self):
        return f"{self.county}"
    class Meta:
        verbose_name_plural = 'County'





