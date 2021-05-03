
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home ,name="home"),
    path('products', views.getProducts ,name="products"),
    path('products/<str:pk>', views.getProduct),

]
