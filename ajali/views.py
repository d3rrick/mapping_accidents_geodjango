from django.shortcuts import render,redirect
from .forms import ReportForm,CarForm,VictimForm
from django.core.serializers import serialize
from django.http import HttpResponse,JsonResponse
from django.contrib.gis.geos import Point
from .models import Accident,County,AnonymousReporter


def index(request):
    
    return render(request, 'portal.html', {})

def data(request):
    accidents = serialize('geojson', Accident.objects.all())
    return HttpResponse(accidents, content_type='json')

def counties(request):
    counties = serialize('geojson', County.objects.all())
    return HttpResponse(counties, content_type='json')


def report(request):
    message=""
    if request.method == 'POST':
        cause = request.POST.get('cause')
        when = request.POST.get('when')
        print(when)
        coordinates = request.POST.get('coordinates')
        coords = coordinates.split(',')
        point = Point(float(coords[0]), float(coords[1]))
        anuser = AnonymousReporter(cause=cause, accident_time=when,location=point)
        anuser.save()
        message = "successful"
        return redirect('report')
       

    return render(request, 'report.html', {"message": message})

def chart(request):

    return render(request, 'chart.html')


def county_data(request):
    points = Accident.objects.all()
    counties = County.objects.all()
    data = []

    for a in points:
        for c in counties:
            if c.geom.contains(a.location):
                data.append(c.county)

    return JsonResponse(data,safe=False)

def individual_data(request,pk):
    print(pk)
    points = Accident.objects.all()
    county = County.objects.filter(pk=pk).first()
    data = []

    for a in points:
        if county.geom.contains(a.location):
            data.append(a)
    if data:
        final = serialize('geojson', data)
    else:
        final='null'


    return JsonResponse(final,safe=False)


