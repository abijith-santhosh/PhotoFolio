# PhotoFolio
Photfolio is an online album react app that allows users to upload, organize and share their digital photos

## Features:

- Add, update, and delete images within albums

- Search and filter images by title

- View images in a carousel

- Responsive design for mobile and desktop devices

- Notifications for successful and failed operations

### Technologies Used

<p >
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,html,css,js,react,firebase" />
  </a>
</p>


## Installation

1. Clone the repository:

2. Navigate to the Project Directory:
```bash
   cd photofolio
   ```
3. Install Dependencies:
```bash
npm install
```
4. Create a Firebase project and configure Firestore. Add your Firebase configuration to a config/fireBase.config.js file:

5. Start the development server:

```bash
npm start
```
6. You will be directed to http://localhost:3000 to view the application.

___

## Usage

- Navigate to the homepage to see a list of photo albums.
- Click "Add Album" to create a new album.
- Select an album to view and manage images within it.
- Use the search bar to filter images by title.
- Click on an image to view it in a carousel.
- Use the "Edit" and "Delete" icons to update or remove images.

___

## Components

- **App**: The main component that manages the state and renders AlbumList and ImageList components.
- **AlbumList**: Displays a list of albums and allows users to add new albums.
- **ImageList**: Displays a list of images within a selected album and allows users to perform CRUD operations.
- **AlbumForm**: Form component for adding a new album.
- **ImageForm**: Form component for adding and editing images.
- **Carousel**: Component for viewing images in a carousel.

___

## Reducers

- **albumReducer**: Manages the state of albums.
- **imageReducer**: Manages the state of images.

___

## Firebase Operations

- **addAlbum**: Adds a new album to Firestore.
- **addImage**: Adds a new image to Firestore.
- **updateImage**: Updates an existing image in Firestore.
- **deleteImage**: Deletes an image from Firestore.
- **onSnapshot**: Listens for real-time updates from Firestore.
___
## Styling
- Custom CSS Modules are used for styling components.
- Responsive design is implemented to ensure compatibility with mobile and desktop devices.
___

