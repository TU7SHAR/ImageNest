export default function NestImage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        role="status"
        className="mx-w-md  p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700 bg-gray-200 dark:bg-gray-100"
      >
        <div className=" sm:text-9xl text-6xl p-3 bg-gray-200 rounded-3xl dark:bg-gray-700  text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400">
          NestImage
        </div>
      </div>
    </div>
  );
}
