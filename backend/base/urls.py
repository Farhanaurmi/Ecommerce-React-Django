
from django.urls import path
from . import views


urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.home ,name="home"),
    path('users/profile', views.getUserProfile ,name="users-profile"),
    path('users/profile/update', views.updateUserProfile ,name="users-profile-update"),
    path('users/register', views.registerUser ,name="register"),
    path('users', views.getUser ,name="users"),
    path('products', views.getProducts ,name="products"),
    path('products/<str:pk>', views.getProduct),
    path('order/add', views.addOrderItem, name="orders-add"),
    
    path('order/<str:pk>', views.getOrderById, name='user-order')

]
