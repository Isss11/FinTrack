from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from expenseTracker import views # think this is the fix

router = routers.DefaultRouter()
router.register(r'expenses', views.ExpenseView, 'expense')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]