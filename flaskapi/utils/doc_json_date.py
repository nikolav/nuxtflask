import json
docJsonDates = lambda d: { 'id': d.id, 'data': json.loads(d.data), 'created_at': str(d.created_at), 'updated_at': str(d.updated_at) }
