import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/solid";
// type Props = {}
const models = [
  {
    id: 1,
    name: "prediction1",
    unavailable: false,
  },
  {
    id: 2,
    name: "prediction2",
    unavailable: false,
  },
  {
    id: 3,
    name: "prediction3",
    unavailable: false,
  },
];

const Page = () => {
  const [query, setQuery] = useState("");

  const fetchTweetsFromTwitter = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/api?search=" + query.toString(),
      {
        method: "POST",
      }
    );
    const response = (await res.json()) as {
      id: string;
      prediction1: string;
      prediction2: string;
      prediction3: string;
      text: string;
    }[];
    setData(response);
  };
  const [model, setModel] = useState(models[0]);

  const [data, setData] = useState<
    {
      id: string;
      prediction1: string;
      prediction2: string;
      prediction3: string;
      text: string;
    }[]
  >([
    // {
    //   id: "1626492462406443008",
    //   prediction1: "Negative",
    //   prediction2: "Negative",
    //   prediction3: "Positive",
    //   text: "Nepal being everything messy and disturbing. But\n؟?\n⁦سےفے⁦\n\n🔹X9🔹\n🔹X9🔹\n🔹X9🔹",
    // },
    // {
    //   id: "1626492407121321984",
    //   prediction1: "Negative",
    //   prediction2: "Negative",
    //   prediction3: "Positive",
    //   text: "The secret talks between our neighboring countries to the north and south have been leaked.  China will attack Taiwan and join China.  India should support China.  And India will merge Nepal with India and China will support it.  Therefore, SPP should be implemented in Nepal now.",
    // },
    // {
    //   id: "1626491880669327360",
    //   prediction1: "Negative",
    //   prediction2: "Negative",
    //   prediction3: "Negative",
    //   text: "Nepal lost another wicket!\n\nRohit Paudel 6 (10) c Jarvis b Watt \nNepal: 55-4 (8.1 overs) \n\nNepal require 220 runs from 41.5 overs.\n\n #CWCL2 #NEPvSCO #weCAN",
    // },
    // {
    //   id: "1626491193768148992",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Positive",
    //   text: "Match 3: After 8.0 Ov, Nepal 55/3. Rohit Paudel 6 (9b), Kushal Malla 8 (15b) #NEPvSCO",
    // },
    // {
    //   id: "1626490721917358080",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Negative",
    //   text: "🇳🇵Nepal also has been a popular destination for regional FES-events as well as activities of Global Union Federations. Over the years, the Kathmandu Office has acquired a reputation for their hospitality – proudly continuing this Nepalese trait.😊(7/9)",
    // },
    // {
    //   id: "1626490718238969856",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Negative",
    //   text: "Another project that is very dear to FES Nepal is the #FESNepalSummerSchool. Every year, they invite around 25 talented and promising young people from different backgrounds for a week-long intensive workshop program to engage on practical issues of democracy. (5/9)",
    // },
    // {
    //   id: "1626490716439584769",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Positive",
    //   text: "FES Nepal works closely with different trade union partners. Their focus has been on supporting them in their strategic reflections and building union power to support social justice in Nepal. With #civil society partners, they mostly work with a focus on #genderjustice. (4/9)",
    // },
    // {
    //   id: "1626490713855889410",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Negative",
    //   text: "Nepal has a challenging topography and is a very diverse country, so discussion programmes on issues of democratic consolidation outside of the #Kathmandu valley have always been an important part of the office’s work. (3/9)",
    // },
    // {
    //   id: "1626490711632904192",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Positive",
    //   text: "𝗗𝘆𝗻𝗮𝗺𝗶𝗰. 𝗙𝗮𝗺𝗶𝗹𝘆. 𝗟𝗮𝘂𝗴𝗵𝘁𝗲𝗿.\n\nFES has been a trusted partner for democracy and social justice in #Nepal since 1995 and is well known for their civic education programme. (2/9)",
    // },
    // {
    //   id: "1626490347890040834",
    //   prediction1: "Positive",
    //   prediction2: "Positive",
    //   prediction3: "Positive",
    //   text: "I just bought a new old Jag, yeah, it's so fast\n\nKodak White by Népal",
    // },
  ]);
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
            className="mx-2 rounded-md bg-indigo-400 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
            onClick={() => {
              fetchTweetsFromTwitter()
                .then((c) => console.log(c))
                .catch((e) => console.log(e));
            }}
          >
            Search
          </button>

          <Listbox value={model} onChange={setModel}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{model?.name}</span>
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
                      key={modelIdx}
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
        {/* <Listbox value={model} onChange={setModel}>
            <Listbox.Button>{model?.name}</Listbox.Button>
            <Listbox.Options>
              {models.map((model) => (
                <Listbox.Option
                  key={model.id}
                  value={model}
                  disabled={model.unavailable}
                >
                  {model.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox> */}

        {/* List of tweets */}
        <div className="mx-2 overflow-y-auto">
          {data?.map((tweet) => (
            <>
              <div
                className="baseline my-2 flex w-full rounded-md bg-white p-2"
                key={tweet.id}
              >
                <div className="mr-4 flex items-center align-baseline">
                  <p
                    className={clsx(
                      tweet.prediction1 === "Positive" && "text-green-500",
                      tweet.prediction1 === "Negative" && "text-red-500"
                    )}
                  >
                    {model?.name === "prediction1" && tweet.prediction1[0]}
                  </p>
                  <p
                    className={clsx(
                      tweet.prediction2 === "Positive" && "text-green-500",
                      tweet.prediction2 === "Negative" && "text-red-500"
                    )}
                  >
                    {model?.name === "prediction2" && tweet.prediction2[0]}
                  </p>
                  <p
                    className={clsx(
                      tweet.prediction3 === "Positive" && "text-green-500",
                      tweet.prediction3 === "Negative" && "text-red-500"
                    )}
                  >
                    {model?.name === "prediction3" && tweet.prediction3[0]}
                  </p>
                </div>
                <div className="">{tweet.text}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div>This is the right content</div>
      </div>
    </main>
  );
};

export default Page;
