import requests

class RepidCliant:
    def __init__(self):
        self.headers = {
            "x-rapidapi-key": "1ca9c3a7eemsh89caa3c7dd49ccfp1c256cjsnf10dd2f7ed30",
            "x-rapidapi-host": "nutrition-calculator.p.rapidapi.com"
            }
        self.url = "https://nutrition-calculator.p.rapidapi.com/api/nutrition-info"

        







    querystring = {"measurement_units":"met","sex":"female","age_value":"20","age_type":"yrs","cm":"160","kilos":"65","activity_level":"Active"}



    response = requests.get(url, headers=headers, params=querystring)

    print(response.json())