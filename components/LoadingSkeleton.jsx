export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="skeleton h-12 w-1/3 mb-4"></div>
      <div className="skeleton h-64 w-full mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
      </div>
    </div>
  )
}