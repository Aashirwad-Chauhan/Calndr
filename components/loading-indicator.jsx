export function LoadingIndicator({message = "Loading..."}) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid border-opacity-75"></div>
          <p className="text-green-500 font-medium">{message}</p>
        </div>
      </div>
    );
}