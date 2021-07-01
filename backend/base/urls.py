
from django.urls import path
from . import views


urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.home ,name="home"),
    path('users/profile', views.getUserProfile ,name="users-profile"),
    path('users/delete/<str:pk>', views.deleteUser ,name="users-delete"),
    path('users/profile/update', views.updateUserProfile ,name="users-profile-update"),
    path('users/register', views.registerUser ,name="register"),
    path('users', views.getUser ,name="users"),
    path('users/<str:pk>', views.getUserById ,name="user"),
    path('users/update/<str:pk>', views.updateUser ,name="user-update"),
    path('products', views.getProducts ,name="products"),
    path('order/myorders', views.getMyOrder, name="myorders"),
    path('products/<str:pk>', views.getProduct),
    path('products/delete/<str:pk>', views.deleteProduct , name='product-delete'),
    path('order/add', views.addOrderItem, name="orders-add"),
    
    
    path('order/<str:pk>/', views.getOrderById, name='user-order'),
    path('order/<str:pk>/pay', views.updateOrderToPaid, name='pay'),

]
