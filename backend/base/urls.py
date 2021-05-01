
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home ,name="home"),
    path('products', views.Products ,name="products"),
    path('products/<str:pk>', views.getProducts),

]
