from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
from datetime import datetime

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email


class Playlist(models.Model):
    video_id = models.CharField(max_length=1000)
    title = models.CharField(max_length=1000)
    url = models.CharField(max_length=1000, null=True, blank=True)
    thumbnail = models.CharField(max_length=1000)
    user_email = models.CharField(max_length=1000)

    class Meta:
        unique_together = (('video_id', 'user_email'),)


class Contact(models.Model):
    contact_email = models.CharField(max_length=1000)
    user_message = models.CharField(max_length=10000)
    contact_date = models.CharField(max_length=50)

    class Meta:
        unique_together = (('contact_email', 'user_message', 'contact_date'),)