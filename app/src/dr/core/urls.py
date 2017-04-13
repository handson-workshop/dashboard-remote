from django.conf.urls import url
from . import views


urlpatterns = [
  url(r'^cast/_update$', views.cast_update),
  url(r'^cast/_remove$', views.cast_remove),
  url(r'^cast/(?P<device_id>[\w\d]+)$', views.cast_view),
  url(r'^cast/(?P<device_id>[\w\d]+)/data$', views.cast_data, name='cast-data'),
  url(r'^remote$', views.remote_control),
]
