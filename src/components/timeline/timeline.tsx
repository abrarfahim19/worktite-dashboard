import { CheckCircle } from "lucide-react";
// import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';

export const Timeline = () => {
  const data = [
    {
      id: 1,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: true,
    },
    {
      id: 2,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: true,
    },
    {
      id: 3,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: true,
    },
    {
      id: 4,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: true,
    },
    {
      id: 5,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: false,
    },
    {
      id: 6,
      name: "Initialize",
      date: "10/12/2023",
      time: "10:00 PM",
      completed: false,
    },
  ];
  return (
    <div className="mt-5 flex w-8 flex-col rounded-3xl bg-special md:h-[44px] md:w-full md:flex-row md:items-center md:justify-between">
      {data.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex flex-col md:flex-row md:bg-special ${
                index === data.length - 1 &&
                "md:rounded-rt-3xl md:rounded-r-3xl"
              } ${index === 0 && "md:rounded-l-3xl md:rounded-t-3xl "}`}
            >
              <div
                className={`relative flex items-center justify-center md:h-[44px]
            ${
              index !== data.length - 1 && data[index + 1].completed
                ? ""
                : "rounded-b-3xl pb-1 md:rounded-b-none md:rounded-r-3xl md:pb-0 md:pr-2"
            }
            ${
              index === 0 &&
              "rounded-t-3xl pt-1 md:rounded-l-3xl md:rounded-tr-none md:pl-2 md:pt-0"
            }
            ${item.completed ? "bg-brand" : "bg-special md:bg-transparent"}`}
              >
                {item.completed ? (
                  <CheckCircle className={`text-3xl font-light text-white`} />
                ) : (
                  <CheckCircle className={`text-3xl font-light text-brand`} />
                )}
                <div className="absolute left-10 h-10 md:left-0 md:top-12">
                  <p className="text-sm font-bold text-black">{item.name}</p>
                  <p className="text-xs text-black">{item.date}</p>
                  <p className="text-xs text-black">{item.time}</p>
                </div>
              </div>
            </div>
            {index !== data.length - 1 && (
              <div
                className={`h-16 grow md:h-[44px]  ${
                  data[index + 1].completed ? "bg-brand" : "bg-special"
                }`}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
