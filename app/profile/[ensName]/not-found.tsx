import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20">
          <span className="text-2xl">❌</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ENS Name Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          The ENS name you&apos;re looking for doesn&apos;t exist or hasn&apos;t been registered yet.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg duration-200 font-semibold cursor-pointer"
        >
          ← Back to Search
        </Link>
      </div>
    </div>
  )
}
