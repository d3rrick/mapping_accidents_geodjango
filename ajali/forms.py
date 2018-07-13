from django import forms


from leaflet.forms.widgets import LeafletWidget
from leaflet.forms.fields import PointField
from .models import Accident,Car,Victim,AnonymousReporter

class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = '__all__'

class VictimForm(forms.ModelForm):
    class Meta:
        model = Victim
        fields = '__all__'

class ReportForm(forms.ModelForm):
   
    class Meta:
        model = AnonymousReporter
        fields = ['cause','accident_time',]