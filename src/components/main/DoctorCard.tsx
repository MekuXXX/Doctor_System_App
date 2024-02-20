import { Badge } from "@/components/ui/badge";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import MainButton from "../global/MainButton";
import StarRate from "./StarRate";
import { RenderedDoctorData } from "@/components/main/DoctorsView";
import { calculateRate } from "@/lib/rate";
import Image from "next/image";
import CurrencyConvert from "../global/CurrencyConvert";

type Props = {
  doctor: RenderedDoctorData;
  isActive?: boolean;
};

export default function DoctorCard({ doctor, isActive }: Props) {
  const rate = calculateRate(doctor.DoctorData?.Rate);
  const discount = 20;
  let lowestPrice = doctor.DoctorData?.doctorSessions?.halfSessions;

  if (doctor.DoctorData?.doctorSessions?.hourSessions < lowestPrice)
    lowestPrice = doctor.DoctorData.doctorSessions?.hourSessions;

  return (
    <Card className="bg-white dark:bg-dark rounded-lg border shadow-md p-4 min-w-[15rem]">
      <CardHeader className="flex justify-between items-start relative">
        {isActive && (
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
      <CardContent className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24 overflow-clip rounded-full">
          <Image
            src={doctor.image}
            alt={"دكتور " + doctor.name}
            fill
            className=" object-cover w-full h-full"
            sizes="9rem"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-lg mb-3">{doctor.name}</p>
          <p className="text-sm text-gray-500 mb-3">
            {doctor.DoctorData?.master?.name}
          </p>
          <StarRate rate={rate} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center mt-4">
        <MainButton className="mx-auto mb-4 text-lg">
          <Link href={`/doctors/${doctor.DoctorData?.id}`}>حجز موعد</Link>
        </MainButton>
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-bold">
            <CurrencyConvert currency={lowestPrice} />
          </div>
          <div className="text-sm text-gray-500 line-through">
            <CurrencyConvert currency={0} />
          </div>
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
