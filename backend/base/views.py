from django.core.checks import messages
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .products import products
from django.http import JsonResponse
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from datetime import datetime

from .models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v


        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



def home(request):
    return JsonResponse("hello, can you hear me!", safe=False)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    serializer=UserSerializerWithToken(user, many=False)

    data=request.data
    user.first_name=data['name']
    user.username=data['email']
    user.email=data['email']
    if data['password'] != '':
        user.password=make_password(data['password'])

    user.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUser(request):
    users=User.objects.all()
    serializer=UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user, many=False)

    data=request.data
    user.first_name=data['name']
    user.username=data['email']
    user.email=data['email']
    user.is_staff=data['isAdmin']

    user.save()
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'details':'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user=request.user
    data=request.data

    orderItem=data['orderItems']

    if orderItem and len(orderItem)==0:
        return Response({'detail':'No Order Items' }, status=status.HTTP_400_BAD_REQUEST)
    else:
        #(1)create_order
        order=Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            shippingPrice = data['shippingPrice'],
            taxPrice = data['taxPrice'],
            totalPrice = data['totalPrice']
        )
        #(2)create_shipping_address
        shipping=ShippingAddress.objects.create(
            Order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalcode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        #(3)create_orderitem_and_set_order_to_orderitem_relationship

        for i in orderItem:
            product=Product.objects.get(_id=i['product'])
            item=OrderIteam.objects.create(
                product=product,
                Order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.photo.url
            )
        #(4)update_stock

            product.countInStock-= item.qty
            product.save()
        serializers=OrderSerializer(order, many=False)

        return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user= request.user
    order= Order.objects.get(_id=pk)
    try:
        if user.is_staff or order.user==user:
            serializer=OrderSerializer(order, many=False)
            return Response(serializer.data)

        else:
            return Response({'detail':'not authorized to view this order'},status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail':'order does not exist'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order= Order.objects.get(_id=pk)
    order.isPaid=True
    order.paidAt= datetime.now()
    order.save()

    return Response("order paid")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrder(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many = True)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    userDeletion= User.objects.get(id=pk)
    userDeletion.delete()

    return Response("user was deleted")

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    productDeletion= Product.objects.get(_id=pk)
    productDeletion.delete()

    return Response("product was deleted")

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user=request.user
    product=Product.objects.create(
        user=user,
        name='sample name',
        brand='sample brand',
        category='sample category',
        description='',
        price=0,
        countInStock=0,
    )
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    user=request.user
    data=request.data
    product= Product.objects.get(_id=pk)

    product.name=data['name']
    product.brand=data['brand']
    product.category=data['category']
    product.description=data['description']
    product.price=data['price']
    product.countInStock=data['countInStock']

    product.save()
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def updateImage(request):
    data = request.data
    productId = data['product_id']
    product = Product.objects.get(_id=productId)
    product.photo = request.FILES.get('image')
    product.save()

    return Response("picture was uploaded")