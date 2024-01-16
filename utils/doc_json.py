import json
docJson = lambda d: dict(id = d.id, data = json.loads(d.data))
