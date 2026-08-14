export default function News({source, author, description, content, publishedAt, title, url, urlToImage}) {
    return (
        <div className="w-full max-w-4xl mx-auto mb-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

   <div className="p-4 sm:p-6 flex flex-col gap-4">

      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
         {title}
      </h3>

      <img
         src={urlToImage}
         alt={`Article: ${title}`}
         className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 border-b border-gray-100 pb-4">

         <p>
            Written by <span className="font-medium text-gray-700">{author || "Unknown"}</span>
         </p>

         <p>
            {new Date(publishedAt).toLocaleDateString()}
         </p>

         <p className="font-medium text-gray-700">
            {source?.name}
         </p>

      </div>

      {/* Description */}
      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-700 leading-relaxed">
         {description}
      </p>

      {/* Content */}
      <p className="text-sm sm:text-base text-gray-600 leading-7 break-words">
         {content}

         {" "}
         <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-medium text-blue-600 hover:text-blue-800 hover:underline"
         >
            Read more →
         </a>
      </p>

   </div>
</div>
    );
}