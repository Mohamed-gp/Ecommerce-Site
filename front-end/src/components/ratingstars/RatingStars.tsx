import { FaStar } from "react-icons/fa6";

export default function RatingStars() {
  return (
    <div className="flex gap-1">
        <FaStar className="text-yellow-400"/>
        <FaStar className="text-yellow-400"/>
        <FaStar className="text-yellow-400"/>
        <FaStar className="text-yellow-400"/>
        <FaStar/>
    </div>
  )
}