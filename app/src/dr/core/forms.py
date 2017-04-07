from django import forms


class ChannelForm(forms.Form):
    url = forms.URLField()
    channels = forms.CharField()
