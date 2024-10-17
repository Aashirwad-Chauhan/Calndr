export default function NotFound() {
    return (
      <div className="w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center">
        <h1 className="text-white text-9xl font-bold animate-bounce">404</h1>
        <p className="text-white text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-white text-lg mt-2 mb-8">Sorry, the page you are looking for doesn&apos;t exist.</p>
        
        <a href="/" className="px-6 py-3 bg-white text-blue-500 font-bold text-lg rounded-full shadow-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
          Go Back Home
        </a>
      </div>
    );
  }
  