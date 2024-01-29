import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select";
import SelectSessionCol from "./SelectSessionCol";

const sessionsTimes = [
  {
    id: 1,
    time: "11:00 PM",
    duration: 60,
  },
  {
    id: 2,
    time: "1:00 AM",
    duration: 30,
  },
  {
    id: 3,
    time: "3:00 AM",
    duration: 60,
  },
  {
    id: 4,
    time: "4:00 AM",
    duration: 60,
  },
  {
    id: 5,
    time: "5:00 AM",
    duration: 30,
  },
];

export default function SelectSessions() {
  return (
    <div className="flex items-start gap-2 justify-center md:justify-start">
      <SelectSessionCol times={sessionsTimes} />

      <SelectSessionCol times={sessionsTimes} />

      <SelectSessionCol times={sessionsTimes} />
    </div>
  );
}
