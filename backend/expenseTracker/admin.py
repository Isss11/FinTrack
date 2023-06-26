from django.contrib import admin
from .models import Expense

# def ExpenseAdmin(admin.ModelAdmin): # FIXME is this supposed to be a
#     list_display = ('title', 'description', 'completed')

# Register your models here.
admin.site.register(Expense)
