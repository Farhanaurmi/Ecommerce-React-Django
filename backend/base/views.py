from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products
from django.http import JsonResponse

def home(request):
    return JsonResponse("hello, can you hear me!", safe=False)

@api_view(['GET'])
def Products(request):
    return Response(products)

@api_view(['GET'])
def getProducts(request,pk):
    p=None
    for i in products:
        if i['_id']==pk:
            p=i
            break
    return Response(p)
