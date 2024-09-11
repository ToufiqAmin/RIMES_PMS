from django.contrib import admin
from .models import *

class ProductAdmin(admin.ModelAdmin):
    list_display=('name','description','price')

# Register your models here.
admin.site.register(Product, ProductAdmin)
