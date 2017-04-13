from django import forms


class ChannelForm(forms.Form):
    url = forms.URLField()
    channels = forms.CharField()

class ChannelRemoveForm(forms.Form):
    channel = forms.CharField()