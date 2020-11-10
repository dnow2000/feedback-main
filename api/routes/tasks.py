from celery.result import AsyncResult
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler.serialization import paginate_obj

from tasks import celery_app
from utils.celery import result_formatted


TASKS_PAGINATION = 10


@app.route('/tasks/<uuid:task_id>')
def get_task(task_id):
    result = AsyncResult(str(task_id), app=celery_app)
    result.get()
    return jsonify(result_formatted(result))


@app.route('/tasks/<tasks_type>')
def get_tasks():
    page = int(request.args.get('page', 1))


    tasks = []


    """
    find_trendings(table_name,
                               days=days,
                               max_trendings=50,
                               min_shares=200,
                               theme=theme)
    """

    paginated_tasks = paginate_obj(tasks,
                                   page,
                                   TASKS_PAGINATION).items

    total_data_count = len(tasks)

    response = jsonify(paginated_trendings)
    response.headers['Total-Data-Count'] = total_data_count
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    if page:
        response.headers['Has-More'] = total_data_count > page * TASKS_PAGINATION
        response.headers['Access-Control-Expose-Headers'] += ',Has-More'

    return response
