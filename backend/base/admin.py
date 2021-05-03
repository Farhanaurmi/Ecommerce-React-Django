from django.contrib import admin
from .models import Product,Review,Order,OrderIteam,ShippingAddress

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderIteam)
admin.site.register(ShippingAddress)
