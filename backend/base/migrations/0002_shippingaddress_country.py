# Generated by Django 3.2.3 on 2021-06-14 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='country',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
