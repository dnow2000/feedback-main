from celery.result import AsyncResult
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler.serialization import paginate_obj

from tasks import celery_app
from utils.celery import tasks_from, task_types_from


TASKS_PAGINATION = 10


@app.route('/tasks/<uuid:task_id>')
def get_task(task_id):
    result = AsyncResult(str(task_id), app=celery_app)
    result.get()
    return jsonify(result_formatted(result))


@app.route('/taskTypes')
def get_task_types():
    return jsonify(task_types_from(celery_app))


@app.route('/tasks')
def get_tasks():
    page = int(request.args.get('page', 1))


    tasks = tasks_from(celery_app,
                       state=request.args.get('state'),
                       #queue=request.args.get('queue')
                       )

    print('TASKS', tasks, page)
    #paginated_tasks = [as_dict(task) for task in tasks]
    paginated_tasks = paginate_obj(tasks,
                                   page,
                                   TASKS_PAGINATION).items

    total_data_count = len(tasks)
    print('PAGINATES', paginated_tasks)

    response = jsonify(paginated_tasks)
    response.headers['Total-Data-Count'] = total_data_count
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    if page:
        response.headers['Has-More'] = total_data_count > page * TASKS_PAGINATION
        response.headers['Access-Control-Expose-Headers'] += ',Has-More'

    return response
