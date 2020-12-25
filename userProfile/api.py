from rest_framework import generics, permissions, views, viewsets
from rest_framework.response import Response
from rest_framework import parsers
from  rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer
from .models import Profile
from drf_extra_fields.fields import Base64ImageField


class ProfileUpdateView(views.APIView):
    
    def patch(self, request, *args, **kwargs):
        phone = request.data.get('phone')
        print(phone, "gop")
        profile_obj = Profile.objects.get(user__phone= phone)
        print(profile_obj)
        data = request.data
        profile_obj.image = data.get('image')
        profile_obj.email = "mayir@g.com"
        profile_obj.save()
        serializer = ProfileSerializer(profile_obj)


        return Response(serializer.data)



class ProfileModelViewSet(viewsets.ModelViewSet):
    parser_classes = (parsers.MultiPartParser,parsers.FormParser)
    permission_classes = [IsAuthenticated,]
    serializer_class = ProfileSerializer
    def perform_create(self, serializer):
        serializer.save(user = self.request.user,name=self.request.data.get('name'), image=self.request.data.get('image'), dob=self.request.data.get('dob'), job=self.request.data.get('job'))