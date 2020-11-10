from time import sleep

from tasks import celery_app



@celery_app.task()
def hello_foo(name):
    #sleep(100)
    return f'Hello Foo, {name}!'

@celery_app.task(queue='try')
def hello_bar(name):
    return f'Hello Bar, {name}!'
