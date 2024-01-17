import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function DataTableColumnHeader({ className, children }: Props) {
  return (
    <h1 className={cn(" uppercase font-bold text-md", className)}>
      {children}
    </h1>
  );
}
