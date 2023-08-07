# from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ExpenseSerializer
from .models import Expense

# Use this for all actions with the Expenses application
class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()