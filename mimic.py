import os
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE','accidents.settings')
import django
django.setup()

from ajali.models import County,Accident

def main():
    print("am working")
    points = Accident.objects.all()
    counties = County.objects.all()

    for a in points:
        for c in counties:
            if c.geom.contains(a.location):
                print(c.county)


if __name__ == "__main__":
    main()
