import { CheckCircle } from "lucide-react";

interface IStep {
  name: string;
  is_complete: boolean;
}

interface IProjectTimelineProps {
  steps: IStep[];
}

export const StaticTimeline: React.FC<IProjectTimelineProps> = ({
  steps: clientStatus,
}) => {
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
              clientStatus[index + 1].is_complete
                ? ""
                : "rounded-b-3xl pb-1 md:rounded-b-none md:rounded-r-3xl md:pb-0 md:pr-2"
            }
            ${
              index === 0 &&
              "rounded-t-3xl pt-1 md:rounded-l-3xl md:rounded-tr-none md:pl-2 md:pt-0"
            }
            ${item.is_complete ? "bg-brand" : "bg-special md:bg-transparent"}`}
              >
                {item.is_complete ? (
                  <CheckCircle className={`text-3xl font-light text-white`} />
                ) : (
                  <CheckCircle className={`text-3xl font-light text-brand`} />
                )}
                <div className="absolute left-10 h-10 w-44 md:left-0 md:top-12">
                  <p className="text-sm font-bold text-black">{item?.name}</p>
                </div>
              </div>
            </div>
            {index !== clientStatus.length - 1 && (
              <div
                className={`h-16 grow md:h-[44px]  ${
                  clientStatus[index + 1].is_complete
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
