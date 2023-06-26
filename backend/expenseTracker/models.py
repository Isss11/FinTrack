from django.db import models

# Create your models here.

class Expense(models.Model): # FIXME
    name = models.CharField(max_length=120, default="")
    amount = models.DecimalField(max_digits=20, decimal_places=4, default=0)
    date = models.DateField(default="2022-12-27")
    category = models.CharField(max_length=120, default="")

    def _str_(self): # FIXME (adjust)
        return self.name