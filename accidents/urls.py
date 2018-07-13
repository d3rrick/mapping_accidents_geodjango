from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url,include
from django.contrib import admin
from django.contrib import admin
admin.site.site_header = 'Accident Administration'

admin.site.index_title = ('Site information')
urlpatterns = [
    url(r'', include('ajali.urls')),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG:urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)