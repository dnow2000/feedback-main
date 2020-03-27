from collections import OrderedDict
from pandas import MultiIndex


def get_indexes_dict(index_keys, index_values):
    if isinstance(index_values, tuple):
        items = list(zip(index_keys, index_values))
    else:
        items = [(index_keys, index_values)]
    return dict(items)


def create_rows_from_data_frame(df, index_keys):
    #print(df.to_dict('index').items())
    index_df = df.to_dict('index')
    index_items = df.to_dict('index').items()
    return [
        OrderedDict({**get_indexes_dict(index_keys, index_values),
                     **columns_dict})
        for (index_values, columns_dict) in index_items
    ]
