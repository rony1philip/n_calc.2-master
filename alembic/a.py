import os.path as path
path_rslv = path.split(path.dirname(path.abspath(__file__)))[1:] 
fileName = path.join(*[".." for dotdot in range(len(path_rslv))], "logging.config")
print(f"{fileName}")
