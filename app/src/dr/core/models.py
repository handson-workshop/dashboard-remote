# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class Channel(models.Model):
	name = models.CharField(max_length=100, unique=True, null=False)
	url = models.URLField(null=False, default=settings.DEFAULT_DASHBOARD_URL)

	def __unicode__(self):
		return "{}: {}".format(self.name, self.url)
