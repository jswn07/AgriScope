function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full" />
    </div>
  )
}

export default LoadingSpinner