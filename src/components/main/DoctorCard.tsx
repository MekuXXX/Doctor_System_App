import { Badge } from "@/components/ui/badge";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { DoctorType } from "@/components/main/DoctorsView";
import MainButton from "../global/MainButton";
import StarRate from "./StarRate";

type Props = DoctorType & {
  key: number;
};
export default function DoctorCard({
  discount,
  status,
  name,
  image,
  position,
  rate,
  priceA,
  priceB,
  id,
}: Props) {
  const rateRenter = Array.from("12345").map((_, i) => {
    return (
      <li key={i}>
        <FaRegStar
          className={i + 1 <= rate ? " fill-yellow-500 text-yellow-500" : ""}
        />
      </li>
    );
  });

  return (
    <Card className="bg-white rounded-lg border shadow-md p-4 min-w-[15rem]">
      <CardHeader className="flex justify-between items-start relative">
        {status && (
          <Badge
            className="bg-[#a2eec0] text-[#217a56] absolute left-4 top-4 pr-4 rounded-full  before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:right-1 before:bg-[#217a56]"
            variant="secondary"
          >
            متوفر الآن
          </Badge>
        )}
        {discount && (
          <div className="bg-[#e74c3c] min-w-fit text-white text-lg font-semibold py-2 px-4 rounded-lg absolute left-[50%] -top-10 translate-x-[-50%]">
            خصم %{discount}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="mb-5">
          <AvatarImage alt={`Dr.${name}`} src={image} />
        </Avatar>
        <div className="text-center">
          <div className="font-bold text-lg mb-3">{name}</div>
          <div className="text-sm text-gray-500 mb-3">{position}</div>
          <div className="flex items-center mt-1">
            <span className="ml-4 mt-4 text-gray-500">
              تقييم {Math.round((rate / 5) * 100)}
            </span>
            <StarRate rate={rate} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center mt-4">
        <MainButton className="mx-auto mb-4 text-lg">
          <Link href={`/doctors/${id}`}>حجز موعد</Link>
        </MainButton>
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-bold">{priceB} EGP</div>
          <div className="text-sm text-gray-500 line-through">{priceA} EGP</div>
        </div>
      </CardFooter>
    </Card>
  );
}

// export default function DoctorCard({
//   discount,
//   status,
//   name,
//   image,
//   position,
//   rate,
//   priceA,
//   priceB,
//   key,
// }: Props) {
//   const rateRenter = Array.from("12345").map((_, i) => {
//     return (
//       <li key={i}>
//         <FaRegStar
//           className={i + 1 <= rate ? " fill-yellow-500 text-yellow-500" : ""}
//         />
//       </li>
//     );
//   });

//   return (
//     <Card
//       className="bg-white rounded-lg border shadow-md p-4 min-w-[15rem] relative"
//       key={key}
//     >
//       <CardHeader className="flex justify-between items-start">
//         {status && (
//           <Badge
//             className="bg-[#a2eec0] text-[#217a56] pr-4 rounded-full absolute left-4 top-4 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:right-1 before:bg-[#217a56]"
//             variant="secondary"
//           >
//             متوفر الآن
//           </Badge>
//         )}
//         {discount && (
//           <div className="bg-[#e74c3c] text-white text-lg font-semibold py-2 px-4 rounded-lg absolute left-[50%] -top-5 translate-x-[-50%]">
//             خصم %{discount}
//           </div>
//         )}
//       </CardHeader>
//       <CardContent className="flex gap-4">
//         <Avatar className="mb-5">
//           <AvatarImage
//             alt={`Dr.${name}`}
//             className=" aspect-auto"
//             src={image}
//           />
//         </Avatar>
//         <div className="text-center">
//           <div className="font-bold text-lg mb-3">{name}</div>
//           <div className="text-sm text-gray-500 mb-3">{position}</div>
//           <div className="flex items-center mt-1">
//             <span className="ml-4 mt-4 text-gray-500">
//               تقييم {Math.round((rate / 5) * 100)}
//             </span>
//             <ul className="flex gap-1 items-center">{rateRenter}</ul>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex items-center justify-between gap-2">
//         <div className="text-sm text-gray-500 line-through min-w-fit">
//           {priceA} EGP
//         </div>
//         <div className="font-bold text-md grow min-w-fit">{priceB} EGP</div>
//         <MainButton className="mb-4 text-lg w-fit">حجز موعد</MainButton>
//       </CardFooter>
//     </Card>
//   );
// }
