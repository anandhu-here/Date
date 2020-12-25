from rest_framework import serializers
from .models import Profile
from drf_extra_fields.fields import Base64ImageField

class ProfileSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Profile
        fields = ('phone','image')
    def get_phone(self, obj):
        print(type(obj), "dcnhdsajckhsdcjks dhduschdsuc h")
        return obj.user.phone
    
