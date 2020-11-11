from time import sleep

from tasks import celery_app



@celery_app.task(queue='default')
def hello_foo(time):
    sleep(time)
    return f'Hello Foo {time}!'

@celery_app.task(queue='default')
def hello_bar(name):
    return f'Hello Bar, {name}!'
