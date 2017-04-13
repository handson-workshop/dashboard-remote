# -*- coding: utf-8 -*-
import json
import logging

from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render

from .models import Channel
from .forms import ChannelForm, ChannelRemoveForm


logger = logging.getLogger(__name__)


def cast_view(request, device_id):
	channel, created = Channel.objects.get_or_create(name=device_id)
	return render(request, 'core/cast.html', {'channel': channel})

def cast_data(request, device_id):
	channel = Channel.objects.get(name=device_id)
	response_data = {'url': channel.url}
	return HttpResponse(json.dumps(response_data), content_type='application/json')

def cast_update(request):
	response_data = {'success': False, 'message': None}
	if request.method != 'POST':
		return HttpResponseBadRequest('{} method not allowed'.format(request.method))

	logger.debug('Updating channels?')

	form = ChannelForm(request.POST)
	if not form.is_valid():
		logger.debug('Errors: %s', form.errors)
		return HttpResponseBadRequest('Invalid data')

	try:
		for name in form.cleaned_data['channels'].split(','):
			channel = Channel.objects.get(name=name)
			logger.info('Changing URL for channel %s: %s', channel, form.cleaned_data['url'])
			channel.url = form.cleaned_data['url']
			channel.save()
		response_data['success'] = True
		response_data['message'] = channel.url
	except Exception, e:
		response_data['message'] = e.message
	finally:
		return HttpResponse(json.dumps(response_data), content_type='application/json')

def cast_remove(request):
	response_data = {'success': False, 'message': None}
	if request.method != 'POST':
		return HttpResponseBadRequest('{} method not allowed'.format(request.method))

	logger.debug('Remove channel')

	form = ChannelRemoveForm(request.POST)
	if not form.is_valid():
		logger.debug('Errors: %s', form.errors)
		return HttpResponseBadRequest('Invalid data')

	try:
		channel = Channel.objects.get(name=form.cleaned_data['channel'])
		channel.delete()

		response_data['success'] = True
		response_data['message'] = form.cleaned_data['channel']
	except Exception, e:
		response_data['message'] = e.message
	finally:
		return HttpResponse(json.dumps(response_data), content_type='application/json')

def remote_control(request):
	return render(request, 'core/remote.html', {'on_air': Channel.objects.all()})
