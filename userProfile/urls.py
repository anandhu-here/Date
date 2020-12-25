from rest_framework.routers import DefaultRouter
from django.urls import path
from .api import ProfileModelViewSet
from .api import ProfileUpdateView
router = DefaultRouter()
router.register('api/profile', ProfileModelViewSet, basename="profile")



urlpatterns = [
    path('api/profile-update/', ProfileUpdateView.as_view())

]
urlpatterns+=router.urls