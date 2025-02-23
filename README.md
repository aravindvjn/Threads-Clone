# Threads Clone ( not finished yet )

A fully functional Threads Clone. Users can create posts (threads), interact with others, and follow their favorite accounts.

## Features

- **User Authentication**: Secure login/signup with JWT based authentication (manual implementation via cookies).
- **Post Creation & Interaction**: Users can create, like, and reply to threads ( can attach images ).
- **Follow System**: Follow/unfollow users and view posts from followed accounts.
- **Profile Management**: Update profile details, including username and bio.
- **Responsive UI**: Fully optimized for all screen sizes.
- **Secure Backend**: Built with Prisma, JWT, and bcrypt for authentication and data management.

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js server actions ( no API routes used )
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT (manual cookie based authentication)
- **Security**: Bcrypt for password hashing, xss to prevent xss attacks
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Image Compression**: Browser Image Compression

## Installation & Setup

### Prerequisites

- Node.js installed
- PostgreSQL database set up

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/aravindvjn/Threads-Clone.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```env

   ```

DATABASE_URL= your_postgresql_database_url 
SECRET_KEY=your secret_key
CLOUDINARY_UPLOAD_PRESET= cloundinary_preset
CLOUDINARY_CLOUD_NAME= cloundinary_name
CLOUDINARY_UPLOAD_URL= cloundinary_url

````

4. Run database migrations:
```sh
npx prisma migrate dev
````

5. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

- Deploy frontend and backend using **Vercel**.
- Ensure that environment variables are set up in the deployment settings.

## Future Enhancements

- Media uploads (images & videos)
- Real-time notifications
- Dark mode
- Search functionality

## License

This project is licensed under the MIT License.

---

🚀 Built with Next.js & Prisma.
