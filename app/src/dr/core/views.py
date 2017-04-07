# -*- coding: utf-8 -*-
import json

from django.http import HttpResponse
from django.shortcuts import render


def cast_view(request, device_id):
  return render(request, 'core/cast.html', {'device_id': device_id})

def cast_data(request, device_id):
  response_data = {'url': 'http://httpbin.org/html'}
  return HttpResponse(json.dumps(response_data), content_type='application/json')

def remote_control(request):
  return render(request, 'core/remote.html')
