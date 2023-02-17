import clsx from "clsx";
import React, { useState } from "react";

// type Props = {}

const Page = () => {
  const [model, selectedModel] = useState<
    "prediction1" | "prediction2" | "prediction3"
  >("prediction1");
  const [data, setData] = useState<
    {
      id: string;
      prediction1: string;
      prediction2: string;
      prediction3: string;
      text: string;
    }[]
  >([
    {
      id: "1626492462406443008",
      prediction1: "Negative",
      prediction2: "Negative",
      prediction3: "Positive",
      text: "Nepal being everything messy and disturbing. But\n؟?\n⁦سےفے⁦\n\n🔹X9🔹\n🔹X9🔹\n🔹X9🔹",
    },
    {
      id: "1626492407121321984",
      prediction1: "Negative",
      prediction2: "Negative",
      prediction3: "Positive",
      text: "The secret talks between our neighboring countries to the north and south have been leaked.  China will attack Taiwan and join China.  India should support China.  And India will merge Nepal with India and China will support it.  Therefore, SPP should be implemented in Nepal now.",
    },
    {
      id: "1626491880669327360",
      prediction1: "Negative",
      prediction2: "Negative",
      prediction3: "Negative",
      text: "Nepal lost another wicket!\n\nRohit Paudel 6 (10) c Jarvis b Watt \nNepal: 55-4 (8.1 overs) \n\nNepal require 220 runs from 41.5 overs.\n\n #CWCL2 #NEPvSCO #weCAN",
    },
    {
      id: "1626491193768148992",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Positive",
      text: "Match 3: After 8.0 Ov, Nepal 55/3. Rohit Paudel 6 (9b), Kushal Malla 8 (15b) #NEPvSCO",
    },
    {
      id: "1626490721917358080",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Negative",
      text: "🇳🇵Nepal also has been a popular destination for regional FES-events as well as activities of Global Union Federations. Over the years, the Kathmandu Office has acquired a reputation for their hospitality – proudly continuing this Nepalese trait.😊(7/9)",
    },
    {
      id: "1626490718238969856",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Negative",
      text: "Another project that is very dear to FES Nepal is the #FESNepalSummerSchool. Every year, they invite around 25 talented and promising young people from different backgrounds for a week-long intensive workshop program to engage on practical issues of democracy. (5/9)",
    },
    {
      id: "1626490716439584769",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Positive",
      text: "FES Nepal works closely with different trade union partners. Their focus has been on supporting them in their strategic reflections and building union power to support social justice in Nepal. With #civil society partners, they mostly work with a focus on #genderjustice. (4/9)",
    },
    {
      id: "1626490713855889410",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Negative",
      text: "Nepal has a challenging topography and is a very diverse country, so discussion programmes on issues of democratic consolidation outside of the #Kathmandu valley have always been an important part of the office’s work. (3/9)",
    },
    {
      id: "1626490711632904192",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Positive",
      text: "𝗗𝘆𝗻𝗮𝗺𝗶𝗰. 𝗙𝗮𝗺𝗶𝗹𝘆. 𝗟𝗮𝘂𝗴𝗵𝘁𝗲𝗿.\n\nFES has been a trusted partner for democracy and social justice in #Nepal since 1995 and is well known for their civic education programme. (2/9)",
    },
    {
      id: "1626490347890040834",
      prediction1: "Positive",
      prediction2: "Positive",
      prediction3: "Positive",
      text: "I just bought a new old Jag, yeah, it's so fast\n\nKodak White by Népal",
    },
  ]);
  return (
    <main className="flex h-screen w-screen flex-row justify-center bg-gray-300">
      <div className="flex flex-1 flex-col ">
        {/* SearchBox */}
        <div className="pb-2">SearchBox</div>
        <div className="overflow-y-auto ">
          {data?.map((tweet) => (
            <>
              <div
                className="baseline my-2 flex w-full bg-white p-2"
                key={tweet.id}
              >
                <div className="mr-4 flex items-center align-baseline">
                  <p
                    className={clsx(
                      tweet.prediction1 === "Positive" && "text-green-500",
                      tweet.prediction1 === "Negative" && "text-red-500"
                    )}
                  >
                    {model === "prediction1" && tweet.prediction1[0]}
                  </p>
                  <p
                    className={clsx(
                      tweet.prediction2 === "Positive" && "text-green-500",
                      tweet.prediction2 === "Negative" && "text-red-500"
                    )}
                  >
                    {model === "prediction2" && tweet.prediction2[0]}
                  </p>
                  <p
                    className={clsx(
                      tweet.prediction3 === "Positive" && "text-green-500",
                      tweet.prediction3 === "Negative" && "text-red-500"
                    )}
                  >
                    {model === "prediction3" && tweet.prediction3[0]}
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
