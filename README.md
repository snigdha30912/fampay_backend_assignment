### Backend Assignment - Github Externship Winter Cohort

### Installation steps
1. Ensure you have python3 installed
2. Clone the repository
3. Switch to backend branch
4. Install the dependencies using `pip install -r requirements.txt`
5. Migrate existing db tables by running `python manage.py migrate`
6. Run the django development server using `python manage.py runserver`
7. Switch to frontend branch
8. Install dependencies using `npm i`
9. Run react server using the command `npm run start`

### Overview
The aim is to make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

#### REST API
YouTube data is fetched from the YouTube API URL. From this fetched data, important parameters like video title, description, publishing date and thumbnail URL are extracted and saved to serializer. REST API is created to perform GET request to fetch the latest videos from YouTube.

![image](https://user-images.githubusercontent.com/58564764/146654024-6c87409d-2340-48bb-9608-2bd1fff361c0.png)

#### Pagination
Pagination has been implemented in Django Rest Framework to limit the number of objects in 1 page to 21.

#### Sorting
Sorting is implemented in Django REST Framework to sort in ascending or descending order of publishing time and video title.

![image](https://user-images.githubusercontent.com/58564764/146654133-57c82715-0ea2-45a1-a3a9-10ead61b7a5a.png)

#### Search Filtering
Search filter is implemented in Django Rest Framework to filter by a key word. It returns all the objects which contains that key word in its name or description.

#### Dahboard
A dashboard is created to view the latest objects in the form of cards arranged in a grid and perform sorting and filtering.

![image](https://user-images.githubusercontent.com/58564764/146654181-202692a6-b5c5-41f9-af0d-71da6196bc9a.png)


