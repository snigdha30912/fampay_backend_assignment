# Generated by Django 3.0.7 on 2021-12-17 14:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('searchapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='video',
            name='publishing_date',
        ),
    ]