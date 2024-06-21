import * as React from "react";
import '../app/globals.css';

interface MyPodPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function MyPodPanel({ isOpen, onClose }: MyPodPanelProps) {
  const codeSnippetRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({
    instruction1: null,
    instruction2: null,
    instruction3: null,
  });

  const copyToClipboard = (key: string) => {
    if (codeSnippetRefs.current[key]) {
      const text = codeSnippetRefs.current[key]?.innerText;
      navigator.clipboard.writeText(text || '');
    }
  };

  React.useEffect(() => {
    // Reset the refs when the component is unmounted
    return () => {
      codeSnippetRefs.current = {
        instruction1: null,
        instruction2: null,
        instruction3: null,
      };
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-y-0 right-0 flex flex-col justify-center w-full max-w-sm p-6 bg-[#1C1C1C] shadow-lg">
      <button
        className="absolute top-4 right-4 text-white hover:text-zinc-300"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-8 text-white">
        <h1 className="mb-2 text-lg font-extrabold text-white">Instructions:</h1>
        <div className="flex items-center mb-2">
          <div
            ref={(ref) => {
              codeSnippetRefs.current.instruction1 = ref;
            }}
            className="flex-1 p-2 rounded-l-md text-md text-sky-300"
          >
            fair cluster info
          </div>
          <br></br>
          <button
            className="px-2 py-2 text-teal-500  rounded-r-md"
            onClick={() => copyToClipboard('instruction1')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-2">
          <div
            ref={(ref) => {
              codeSnippetRefs.current.instruction2 = ref;
            }}
            className="flex-1 p-2  rounded-l-md text-purple-300"
          >
            fair docker -e &lt;node_id&gt; run alpine echo hello
          </div>
          <button
            className="px-2 py-1 text-teal-500  rounded-r-md"
            onClick={() => copyToClipboard('instruction2')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-2">
          <div
            ref={(ref) => {
              codeSnippetRefs.current.instruction3 = ref;
            }}
            className="flex-1 p-2 rounded-l-md text-pink-300"
          >
            fair cluster executors rename &lt;node_id&gt; new_name
          </div>
          <button
            className="px-2 py-1 text-teal-500 rounded-r-md"
            onClick={() => copyToClipboard('instruction3')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <p className="mt-4 ml-2 text-orange-300">
          Check out other commands at{' '}
          
          <a  href="https://faircompute.com/docs/cli-interface/launching-jobs"
            className="text-blue-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://faircompute.com/docs/cli-interface/launching-jobs
          </a>
        </p>
      </div>

      <div className="flex justify-end w-full gap-4 px-3 py-6 mt-auto max-md:flex-col max-md:items-stretch">
        <button
          className="px-6 py-2 text-sm font-medium text-white bg-neutral-800 border border-zinc-500 rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
    </>
  );
}

export default MyPodPanel;