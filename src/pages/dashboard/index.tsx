import clsx from "clsx";
import React, { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/solid";

export interface SentimentResponse {
  id: string;
  tweet: string;
  models: {
    model_id: number;
    name: string;
    prediction: "Positive" | "Negative" | "Neutral";
  }[];
}

import { useQuery } from "react-query";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

const models = [
  {
    model_id: 0,
    name: "Multinomial Naive Bayes" as const,
    unavailable: false,
  },
  {
    model_id: 1,
    name: "Support Vector Machine" as const,
    unavailable: false,
  },
  {
    model_id: 2,
    name: "Random Forest Classifier" as const,
    unavailable: false,
  },
  { model_id: 3, name: "BERT Finetuned" as const, unavailable: false },
  {
    model_id: 4,
    name: "Twitter XLM Sentiment Finetuned" as const,
    unavailable: false,
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#442244"];
const Page = () => {
  const [query, setQuery] = useState("");

  const fetchTweetsFromTwitter = async () => {
    const res = await fetch(
      "http://localhost:3000/api/gettweets?search=" + query.toString(),
      {
        method: "POST",
      }
    );
    const response = (await res.json()) as SentimentResponse[];
    return response;
  };
  const [selectedModel, setModel] = useState(models[0]);
  const [_, setCurrentQuery] = useState("");
  const { data, refetch, isLoading, isFetching } = useQuery(
    ["data"],
    () => fetchTweetsFromTwitter(),
    {
      enabled: false,
      onSuccess() {
        setCurrentQuery(query.toString());
      },
    }
  );

  // const labels = [`Tweets containing ${query}`];

  const negativeTweetsForModel = useMemo(() => {
    if (selectedModel?.name) {
      return data?.filter(
        (tweet) =>
          tweet.models[selectedModel.model_id]?.prediction === "Negative"
      ).length;
    }
    return 0;
  }, [data, selectedModel]);
  const positiveTweetsForModel = useMemo(() => {
    if (selectedModel?.name) {
      return data?.filter(
        (tweet) =>
          tweet.models[selectedModel.model_id]?.prediction === "Positive"
      ).length;
    }
    return 0;
  }, [data, selectedModel]);

  const neutralTweetsForModel = useMemo(() => {
    if (selectedModel?.name) {
      return data?.filter(
        (tweet) =>
          tweet.models[selectedModel.model_id]?.prediction === "Neutral"
      ).length;
    }
    return 0;
  }, [selectedModel, data]);
  const barData = [
    {
      positive: positiveTweetsForModel!,
      negative: negativeTweetsForModel!,
      neutral: neutralTweetsForModel!,
      name: selectedModel?.name,
    },
  ];
  const pieChartData = [
    {
      name: "Postive",
      value: positiveTweetsForModel,
    },
    {
      name: "Negative",
      value: negativeTweetsForModel,
    },
    {
      name: "Neutral",
      value: neutralTweetsForModel,
    },
  ];

  // const label = `Tweets containing ${query}`;

  return (
    <main className="flex h-screen w-screen flex-row justify-center bg-gray-300">
      <div className="flex flex-1 flex-col ">
        {/* SearchBox */}
        <div className="ml-2 pb-2 pt-2">
          <input
            placeholder="Search Query"
            className="h-8 w-6/12 rounded-md bg-gray-200 px-2"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={isFetching}
            className="mx-2 rounded-md bg-indigo-400 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await refetch()}
          >
            {isFetching && "Loading"}
            {!isFetching && "Search"}
          </button>

          <Listbox value={selectedModel} onChange={setModel}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedModel?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {models.map((model, modelIdx) => (
                    <Listbox.Option
                      key={model.model_id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={model}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {model.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* List of tweets */}
        <div className="overflow-y-auto px-4">
          {isLoading ? (
            <div className="items-centers flex justify-center">
              <p>Loading data wait patiently</p>
            </div>
          ) : (
            <>
              {selectedModel && (
                <>
                  {data?.map((tweet) => (
                    <>
                      <div
                        className="baseline my-2 flex w-full rounded-md bg-white p-2"
                        key={tweet.id}
                      >
                        <div className="ml-2 mr-4 flex items-center align-baseline">
                          <p
                            className={clsx(
                              tweet.models[selectedModel.model_id]
                                ?.prediction === "Positive" && "text-green-500",
                              tweet.models[selectedModel.model_id]
                                ?.prediction === "Negative" && "text-red-500",
                              "font-bold",
                              tweet.models[selectedModel.model_id]
                                ?.prediction === "Neutral" && "text-amber-900"
                            )}
                          >
                            {
                              tweet.models[selectedModel.model_id]
                                ?.prediction[0]
                            }
                          </p>
                        </div>
                        <div className="">{tweet.tweet}</div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center overflow-y-scroll pt-8">
        {data && (
          <>
            <ResponsiveContainer width="100%" height="50%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" fill="#8884d8" />
                <Bar dataKey="negative" fill="#82ca9d" />
                <Bar dataKey="neutral" fill="#442244" />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="50%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieChartData}
                  cx="60%"
                  cy="60%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}

        {!data && !isLoading && <p>Nothing to see here</p>}
        {!data && isLoading && <p>Loading data... Please wait patiently.</p>}
      </div>
    </main>
  );
};

export default Page;
