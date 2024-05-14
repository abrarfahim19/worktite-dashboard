import { apiRoutes } from "@/config/common/apiRoutes";
import {
  timezoneToDDMMYYYY,
  timezoneToHHMM,
} from "@/config/common/timeFunctions";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { truncateText } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface IProjectTimelineProps {
  id: string;
}
interface IData {
  id: number;
  title: string;
  is_selected: boolean;
  selected_at: string;
  created_at: string;
  updated_at: string;
}
export const Timeline: React.FC<IProjectTimelineProps> = ({ id }) => {
  const { data: clientStatus } = useAxiosSWR<IData>(
    apiRoutes.PROTECTED.PROJECTS.CLIENT_STATUS.LIST(id)({ limit: 6 }),
  );
  return (
    <div className="mt-5 flex w-8 flex-col rounded-3xl bg-special md:h-[44px] md:w-full md:flex-row md:items-center md:justify-between">
      {clientStatus.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex flex-col md:flex-row md:bg-special ${
                index === clientStatus.length - 1 &&
                "md:rounded-rt-3xl md:rounded-r-3xl"
              } ${index === 0 && "md:rounded-l-3xl md:rounded-t-3xl "}`}
            >
              <div
                className={`relative flex items-center justify-center md:h-[44px]
            ${
              index !== clientStatus.length - 1 &&
              clientStatus[index + 1].is_selected
                ? ""
                : "rounded-b-3xl pb-1 md:rounded-b-none md:rounded-r-3xl md:pb-0 md:pr-2"
            }
            ${
              index === 0 &&
              "rounded-t-3xl pt-1 md:rounded-l-3xl md:rounded-tr-none md:pl-2 md:pt-0"
            }
            ${item.is_selected ? "bg-brand" : "bg-special md:bg-transparent"}`}
              >
                {item.is_selected ? (
                  <CheckCircle className={`text-3xl font-light text-white`} />
                ) : (
                  <CheckCircle className={`text-3xl font-light text-brand`} />
                )}
                <div className="absolute left-10 h-10 md:left-0 md:top-12">
                  <p className="text-sm font-bold text-black">
                    {truncateText(item?.title, 10)}
                  </p>
                  <p className="text-xs text-black">
                    {timezoneToDDMMYYYY(item?.selected_at)}
                  </p>
                  <p className="text-xs text-black">
                    {timezoneToHHMM(item?.selected_at)}
                  </p>
                </div>
              </div>
            </div>
            {index !== clientStatus.length - 1 && (
              <div
                className={`h-16 grow md:h-[44px]  ${
                  clientStatus[index + 1].is_selected
                    ? "bg-brand"
                    : "bg-special"
                }`}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
