import { useNavigate } from "react-router-dom";
export const Card  = ({imageSrc,imageAlt,portalName,overView, onClick}) =>{


    return (
        <div
        onClick={onClick}
        className="cursor-pointer p-8 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group"
      >
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-14 h-14 group-hover:rotate-6 transition-transform"
          />
        </div>
        <h2 className="text-2xl font-bold text-blue-800 mb-3">{portalName}</h2>
        <p className="text-gray-600 mb-6">
         {overView}
        </p>
        <div className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center">
          <span>Access Portal</span>
          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>)


}