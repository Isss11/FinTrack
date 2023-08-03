# Generated by Django 4.2.2 on 2023-06-26 00:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenseTracker', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='completed',
        ),
        migrations.RemoveField(
            model_name='expense',
            name='description',
        ),
        migrations.RemoveField(
            model_name='expense',
            name='title',
        ),
        migrations.AddField(
            model_name='expense',
            name='amount',
            field=models.DecimalField(decimal_places=4, default=0, max_digits=20),
        ),
        migrations.AddField(
            model_name='expense',
            name='category',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AddField(
            model_name='expense',
            name='date',
            field=models.DateField(default='2022-12-27'),
        ),
        migrations.AddField(
            model_name='expense',
            name='name',
            field=models.CharField(default='', max_length=120),
        ),
    ]