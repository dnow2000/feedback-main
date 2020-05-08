from sqlalchemy_api_handler import ApiHandler, logger

from models.scene import Scene
from models.scene_tag import SceneTag
from models.tag import Tag


def create_scene_tags():
    logger.info('create_scene_tags')

    scene_tags = []

    scene = Scene.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    tag = Tag.query.filter_by(text='climate').one()
    scene_tags.append(SceneTag(
        scene=scene,
        tag=tag
    ))

    scene = Scene.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/scene-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    tag = Tag.query.filter_by(text='climate').one()
    scene_tags.append(SceneTag(
        scene=scene,
        tag=tag
    ))


    scene = Scene.query.filter_by(url='https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life').one()
    tag = Tag.query.filter_by(text='climate').one()
    scene_tags.append(SceneTag(
        scene=scene,
        tag=tag
    ))

    scene = Scene.query.filter_by(url='https://www.lemonde.fr/sciences/scene/2018/07/24/maladie-de-lyme-fronde-contre-la-haute-autorite-de-sante_5335369_1650684.html').one()
    tag = Tag.query.filter_by(text='health').one()
    scene_tags.append(SceneTag(
        scene=scene,
        tag=tag
    ))

    scene = Scene.query.filter_by(url='https://www.earth-syst-sci-data.net/7/47/2015/essd-7-47-2015.html').one()
    tag = Tag.query.filter_by(text='climate').one()
    scene_tags.append(SceneTag(
        scene=scene,
        tag=tag
    ))

    ApiHandler.save(*scene_tags)

    logger.info('created {} scene_tags_by_name'.format(len(scene_tags)))
