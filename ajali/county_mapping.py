import os
from django.contrib.gis.utils import LayerMapping
from .models import County

county_mapping = {
    'objectid' : 'OBJECTID',
    'area' : 'AREA',
    'perimeter' : 'PERIMETER',
    'county3_field' : 'COUNTY3_',
    'county3_id' : 'COUNTY3_ID',
    'county' : 'COUNTY',
    'shape_leng' : 'Shape_Leng',
    'shape_area' : 'Shape_Area',
    'geom' : 'MULTIPOLYGON',
}

county_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data/counties', 'County.shp'),)


def run(verbose=True):
    lm = LayerMapping(
        County, county_shp, county_mapping,
        transform=False, encoding='iso-8859-1',
    )
    lm.save(strict=True, verbose=verbose)