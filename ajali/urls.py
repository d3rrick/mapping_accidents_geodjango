from django.conf.urls import url

from . import views
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^report/$', views.report, name='report'),
    url(r'^chart/$', views.chart, name='chart'),
    url(r'^counties/$', views.counties, name='counties'),
    url(r'^county_data/$', views.county_data, name='county_data'),
    url(r'^individual_data/(?P<pk>\d+)/$', views.individual_data, name='individual_datass'),
    url(r'^data/$', views.data)
]