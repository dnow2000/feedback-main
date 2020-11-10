from pprint import pprint
import types
import sys
from flask import current_app as app
from flask_script import Command

from tasks import celery_app, import_tasks
from utils.celery import tasks_from
from utils.config import COMMAND_NAME


@app.manager.add_command
class TaskCommand(Command):
    __doc__ = ''' e.g. `{} task tasks.sandbox.sync_with_thumb delay 2` will trigger a foo task'''.format(COMMAND_NAME)
    name = 'task'
    capture_all_args = True


    def run(self, args):
        import_tasks()

        if not args:
            task_names = [key for key in celery_app.tasks.keys() if not key.startswith('celery.')]
            print('You need to choose a task name among: \n {}'.format(',\n '.join(task_names)))
            return

        if args[0] == 'list':
            print('III')
            print(tasks_from(celery_app))


        for (task_name, task) in celery_app.tasks.items():
            if task_name == args[0]:
                if len(args) > 1:
                    getattr(task, args[1])(*args[2:])
                else:
                    print('You selected the {}'.format(task))
                return

        print('Did not found a task with that clue.')
