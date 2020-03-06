#!/usr/bin/env python3

import json
import elasticsearch
import sys


def get_dic(filename):
    f = open(filename, "r")
    dic = json.load(f)
    return dic

def export_to_elastic(dic):
    for e in dic:
        _id = e[""]


if __name__ == "__main__":
    filename = sys.argv[1]
    
