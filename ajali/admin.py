from django.contrib import admin
from .models import Car, Victim,Accident,County,AnonymousReporter
from django.contrib.gis import admin as geoAdmin
from leaflet.admin import LeafletGeoAdmin

class AccidentAdmin(geoAdmin.OSMGeoAdmin):
    # list_display = ('id', 'first_name', 'last_name', 'phone','date')
    # search_fields = ['first_name', 'phone']
    # ordering = ['id']
    # list_filter = ('id', 'phone')
    default_lon = 4093226.24402 # 37.050093#
    default_lat = -145706.24878 # -0.561360
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500


class CountyAdmin(geoAdmin.OSMGeoAdmin):
    pass

class AnonymousReporterAdmin(geoAdmin.OSMGeoAdmin):
    default_lon = 4093226.24402 # 37.050093#
    default_lat = -145706.24878
    default_zoom = 7


admin.site.register(AnonymousReporter, AnonymousReporterAdmin)
admin.site.register(County, CountyAdmin)
admin.site.register(Victim)
admin.site.register(Car)
admin.site.register(Accident, AccidentAdmin)