import json
from flask import current_app as app
from flask_script import Command
from sqlalchemy_api_handler import ApiHandler, as_dict


from models.feature import Feature, FeatureName
from utils.config import COMMAND_NAME


@app.manager.add_command
class FeatureCommand(Command):
    __doc__ = ''' e.g. `{} feature {} switch` will toggle isActive of this feature'''.format(COMMAND_NAME, list(FeatureName)[0].name)
    name = 'feature'
    capture_all_args = True

    def run(self, args):
        feature_names = [f.name for f in FeatureName]

        if not args or args[0] not in feature_names:
            print('You need to choose a feature name among: {}'.format(','.join(feature_names)))
            return
        feature = Feature.query.filter_by(name=getattr(FeatureName, args[0])) \
                               .one()
        if len(args) > 1:
            if args[1] == 'switch':
                print('You want to switch {}, now it is : '.format(args[0]))
                feature.isActive = not feature.isActive
                ApiHandler.save(feature)
            else:
                print('You typed {} which is a wrong option, only option is `switch`.'.format(args[1]))

        print(json.dumps(as_dict(feature), indent=2, sort_keys=True))
