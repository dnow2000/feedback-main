import json

import sandboxes.getters as getters


def get_end2end_helpers(module_name):
    module = getattr(getters, module_name)
    items = [
        (key.split('get_')[1].upper(), getattr(module, key)())
        for key in dir(module)
        if key.startswith('get_existing')
    ]
    return dict(items)


def print_end2end_helpers(module_name):
    print('\n{} :'.format(module_name))
    print(json.dumps(get_end2end_helpers(module_name), indent=2))


def print_all_end2end_helpers():
    module_names = [
        m for m in dir(getters)
        if type(getattr(getters, m)).__name__ == 'module'
    ]
    for module_name in module_names:
        if module_name == 'sandboxes':
            continue
        print_end2end_helpers(module_name)
