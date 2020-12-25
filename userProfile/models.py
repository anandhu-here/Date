from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
User = get_user_model()

# Create your models here.

def upload_image_path_profile(instance, filename):
    return f"dp/{instance.name}/{filename}/"

class Profile(models.Model):
    user            =   models.OneToOneField(User, on_delete= models.CASCADE)
    name            =   models.CharField(blank=True, null=True, max_length = 50)
    job             =   models.CharField(blank=True, null=True,max_length = 50)
    email           =   models.EmailField( blank = True, null = True)
    image           =   models.ImageField(upload_to = upload_image_path_profile, default=None, null = True, blank = True)
    dob             =   models.DateField(blank=True, null=True)
    city            =   models.CharField(max_length = 30, blank = True, null = True)
    first_count     =   models.IntegerField(default=0, help_text='It is 0, if the user is totally new and 1 if the user has saved his standard once' )

    def __str__(self):
        return str(self.user) 




