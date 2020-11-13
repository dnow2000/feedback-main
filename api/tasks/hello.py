from time import sleep

from tasks import celery_app



@celery_app.task
def hello_foo(time):
    sleep(int(time))
    return { 'text': f'Hello Foo {time}!' }

@celery_app.task
def hello_bar(name):
    return { 'text': f'Hello Bar, {name}!' }
